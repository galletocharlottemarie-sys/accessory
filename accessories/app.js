// CONFIGURATION - Replace with your project details
const SUPABASE_URL = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const PAYMONGO_PUBLIC_KEY = 'pk_test_YOUR_PAYMONGO_KEY';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let authIsRegisterMode = false;

// INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
  feather.replace();
  await checkSession();
  await loadProducts();
});

// AUTHENTICATION LOGIC
async function checkSession() {
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    currentUser = session.user;
    updateAuthUI(true);
  } else {
    updateAuthUI(false);
  }
}

function updateAuthUI(isLoggedIn) {
  const authBtn = document.getElementById('auth-btn');
  if (isLoggedIn) {
    authBtn.textContent = 'Sign Out';
    authBtn.onclick = handleSignOut;
  } else {
    authBtn.textContent = 'Sign In';
    authBtn.onclick = openAuthModal;
  }
}

function toggleAuthMode(e) {
  e.preventDefault();
  authIsRegisterMode = !authIsRegisterMode;
  
  const title = document.getElementById('modal-title');
  const registerFields = document.getElementById('register-fields');
  const submitBtn = document.getElementById('auth-submit-btn');
  const toggleMsg = document.getElementById('auth-toggle-msg');
  const toggleLink = document.getElementById('auth-toggle-link');

  if (authIsRegisterMode) {
    title.textContent = 'Register Account';
    registerFields.classList.remove('hidden');
    submitBtn.textContent = 'Create Account';
    toggleMsg.textContent = 'Already have an account?';
    toggleLink.textContent = 'Sign In';
  } else {
    title.textContent = 'Sign In to AURA';
    registerFields.classList.add('hidden');
    submitBtn.textContent = 'Sign In';
    toggleMsg.textContent = "Don't have an account?";
    toggleLink.textContent = 'Register now';
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;

  try {
    if (authIsRegisterMode) {
      const fullName = document.getElementById('auth-name').value;
      const gcash = document.getElementById('auth-gcash').value;

      const { data, error } = await db.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        // Create user profile with GCash number
        const { error: profileError } = await db.from('profiles').insert([{
          id: data.user.id,
          full_name: fullName,
          gcash_number: gcash
        }]);
        if (profileError) throw profileError;
        alert('Registration successful!');
      }
    } else {
      const { error } = await db.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }
    
    closeAuthModal();
    checkSession();
  } catch (err) {
    alert(err.message);
  }
}

async function handleSignOut() {
  await db.auth.signOut();
  currentUser = null;
  updateAuthUI(false);
}

// STORE & PRODUCT FETCHING
async function loadProducts(category = 'all') {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '<p>Loading luxury collections...</p>';

  let query = db.from('products').select('*');
  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data: products, error } = await query;

  if (error) {
    grid.innerHTML = '<p>Error fetching products.</p>';
    return;
  }

  grid.innerHTML = products.map(prod => `
    <div class="product-card">
      <img src="${prod.image_url}" class="product-img" alt="${prod.title}" />
      <div class="product-info">
        <span class="product-category">${prod.category}</span>
        <h3>${prod.title}</h3>
        <div class="product-price">₱${parseFloat(prod.price).toLocaleString('en-PH', {minimumFractionDigits: 2})}</div>
        <p>${prod.description.substring(0, 70)}...</p>
        <div class="product-actions">
          <button class="btn btn-primary btn-full" onclick="initiatePaymongoCheckout('${prod.id}', ${prod.price}, '${prod.title}')">Buy via GCash/Card</button>
          <button class="btn btn-secondary" onclick="openReviewModal('${prod.id}')">★</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(cat) {
  document.querySelectorAll('.filter-pills .pill').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
  loadProducts(cat);
}

// SELLER DASHBOARD: ADD PRODUCT
async function handleCreateProduct(e) {
  e.preventDefault();
  if (!currentUser) {
    alert('Please sign in to list items for sale.');
    openAuthModal();
    return;
  }

  const productData = {
    seller_id: currentUser.id,
    title: document.getElementById('prod-title').value,
    price: parseFloat(document.getElementById('prod-price').value),
    category: document.getElementById('prod-category').value,
    image_url: document.getElementById('prod-img').value,
    description: document.getElementById('prod-desc').value
  };

  const { error } = await db.from('products').insert([productData]);

  if (error) {
    alert('Failed to publish product: ' + error.message);
  } else {
    alert('Product listed successfully!');
    document.getElementById('add-product-form').reset();
    loadProducts();
  }
}

// PAYMONGO PAYMENT INTEGRATION
async function initiatePaymongoCheckout(productId, amount, title) {
  if (!currentUser) {
    alert('Please sign in to complete your checkout.');
    openAuthModal();
    return;
  }

  try {
    // Calling serverless endpoint running PayMongo checkout session creation
    const response = await fetch('/api/paymongo-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        amount: amount * 100, // Amount in centavos
        title,
        userId: currentUser.id
      })
    });

    const session = await response.json();
    if (session.checkout_url) {
      window.location.href = session.checkout_url; // Redirect to PayMongo Hosted Payment Page
    } else {
      throw new Error('Checkout session creation failed.');
    }
  } catch (err) {
    alert('Payment error: ' + err.message);
  }
}

// REVIEWS & RATINGS SYSTEM
async function openReviewModal(productId) {
  document.getElementById('review-prod-id').value = productId;
  document.getElementById('review-modal').classList.remove('hidden');
  await fetchReviews(productId);
}

async function fetchReviews(productId) {
  const container = document.getElementById('reviews-list');
  container.innerHTML = 'Loading feedback...';

  const { data: reviews, error } = await db
    .from('reviews')
    .select('rating, comment, created_at, profiles(full_name)')
    .eq('product_id', productId);

  if (error || reviews.length === 0) {
    container.innerHTML = '<p>No reviews yet for this product.</p>';
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
      <div style="color: var(--accent-gold);">${'★'.repeat(r.rating)}</div>
      <p style="color:#fff; font-weight:600;">${r.profiles?.full_name || 'Anonymous User'}</p>
      <p>${r.comment}</p>
    </div>
  `).join('');
}

async function handleReviewSubmit(e) {
  e.preventDefault();
  if (!currentUser) {
    alert('Please sign in to submit a review.');
    return;
  }

  const productId = document.getElementById('review-prod-id').value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const comment = document.getElementById('review-comment').value;

  const { error } = await db.from('reviews').insert([{
    product_id: productId,
    user_id: currentUser.id,
    rating: parseInt(rating),
    comment: comment
  }]);

  if (error) {
    alert(error.message);
  } else {
    alert('Review posted!');
    document.getElementById('review-form').reset();
    fetchReviews(productId);
  }
}

// UI HELPER FUNCTIONS
function openAuthModal() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('auth-modal').classList.add('hidden'); }
function closeReviewModal() { document.getElementById('review-modal').classList.add('hidden'); }
function handleContactSubmit(e) { e.preventDefault(); alert('Message sent to atelier team!'); }
