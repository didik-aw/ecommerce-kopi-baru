import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  origin: string;
  price: number;
  flavorNotes: string;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const coffeeProducts: Product[] = [
  {
    id: 1,
    name: 'Gayo Aceh Special Reserve',
    origin: 'Aceh, Sumatra',
    price: 125000,
    flavorNotes: 'Dark Chocolate, Caramel, Earthy',
    image: '/aceh.jpg',
    category: 'Arabica'
  },
  {
    id: 2,
    name: 'Toraja Kalosi Artisan',
    origin: 'Toraja, Sulawesi',
    price: 135000,
    flavorNotes: 'Spicy, Fruity, Balanced Body',
    image: '/toraja.jpg',
    category: 'Arabica'
  },
  {
    id: 3,
    name: 'Kintamani Bali Natural',
    origin: 'Bali, Indonesia',
    price: 115000,
    flavorNotes: 'Citrus, Floral, Sweet Orange',
    image: '/kintamani.jpg',
    category: 'Arabica'
  },
  {
    id: 4,
    name: 'Java Robusta Gold',
    origin: 'Temanggung, Central Java',
    price: 90000,
    flavorNotes: 'Bold, Peanut, Low Acidity',
    image: '/temanggung.jpg',
    category: 'Robusta'
  },
  {
    id: 5,
    name: 'Luwak Boyolali Heritage',
    origin: 'Boyolali, Jawa Tengah',
    price: 250000,
    flavorNotes: 'Fruity, Complex, Smooth Aftertaste',
    image: '/luwak.jpg',
    category: 'Arabica'
  },
  {
    id: 6,
    name: 'Lampung Robusta Prime',
    origin: 'Lampung, Sumatra',
    price: 85000,
    flavorNotes: 'Natural, Strong Body, Chocolate Hint',
    image: '/lampung.jpg',
    category: 'Robusta'
  },
  {
    id: 7,
    name: 'Pontianak Liberica/Robusta',
    origin: 'Pontianak, Kalimantan',
    price: 80000,
    flavorNotes: 'Natural, Unique Earthy, Sweet Aroma',
    image: '/pontianak.jpg',
    category: 'Robusta'
  }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? coffeeProducts 
    : coffeeProducts.filter(p => p.category === selectedCategory);

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const bankAccount = "1234567890";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur border-b border-stone-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <h1 className="font-bold text-xl tracking-wider text-amber-500">KALA COFFEE ROASTERS</h1>
          </div>
          <button
            onClick={() => { setIsCartOpen(true); setStep('cart'); }}
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            🛒 Cart ({totalItems})
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative py-24 px-6 text-center border-b border-stone-800 bg-stone-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80" 
              alt="Hero Coffee" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest border border-amber-500/30">
              Artisan Indonesian Beans
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-5 tracking-tight leading-tight">
              Discover the True Taste of <span className="text-amber-400">Nusantara Coffee</span>
            </h2>
            <p className="text-stone-300 text-base mt-4 font-light max-w-2xl mx-auto">
              Diambil langsung dari petani lokal terbaik di seluruh penjuru negeri, disangrai dengan presisi tinggi untuk pengalaman ngopi yang autentik.
            </p>
            <div className="mt-8 flex justify-center">
              <a href="#katalog" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200">
                ☕ Beli & Lihat Katalog
              </a>
            </div>
          </div>
        </section>

        {/* Katalog Produk */}
        <main id="katalog" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">Koleksi Biji Kopi Pilihan</h3>
            <div className="flex gap-2">
              {['All', 'Arabica', 'Robusta'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white border border-stone-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all group">
                <div>
                  <div className="h-48 overflow-hidden bg-stone-950 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 right-2 bg-stone-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] uppercase font-bold text-amber-400 border border-stone-800">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-xs text-amber-500 font-semibold uppercase tracking-wider">{product.origin}</span>
                    <h4 className="font-bold text-lg text-white mt-1">{product.name}</h4>
                    <p className="text-xs text-stone-400 mt-1 italic">Notes: {product.flavorNotes}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between mt-4">
                  <span className="font-extrabold text-amber-400 text-base">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-8 px-6 text-stone-400 text-sm text-center">
        <p className="text-xs text-stone-500">© 2026 Kala Coffee Roasters. All rights reserved.</p>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-stone-900 border-l border-stone-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            {step === 'cart' && (
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <h3 className="font-bold text-lg text-white">🛒 Your Shopping Cart</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white text-sm bg-stone-800 px-2.5 py-1 rounded-lg">✕ Close</button>
                </div>
                <div className="divide-y divide-stone-800 max-h-[35vh] overflow-y-auto my-4 pr-1">
                  {cart.length === 0 ? (
                    <p className="text-stone-500 text-sm text-center py-8">Keranjang belanja masih kosong.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="py-3 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-sm text-white">{item.product.name}</h4>
                          <p className="text-xs text-amber-400">Rp {item.product.price.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="bg-stone-800 text-stone-300 w-6 h-6 rounded font-bold">-</button>
                          <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="bg-stone-800 text-stone-300 w-6 h-6 rounded font-bold">+</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t border-stone-800 pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase">📝 Data Pengiriman:</h4>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Nama Lengkap" className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                    <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Nomor WhatsApp" className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500" />
                    <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Alamat Lengkap" rows={2} className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 resize-none" />
                  </div>
                )}
              </div>
            )}

            {step === 'payment' && (
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <h3 className="font-bold text-lg text-white">💳 Pembayaran</h3>
                  <button onClick={() => setStep('cart')} className="text-stone-400 text-sm bg-stone-800 px-2.5 py-1 rounded-lg">← Kembali</button>
                </div>
                <div className="my-5 space-y-4">
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800">
                    <p className="text-xs text-stone-400">Total Tagihan:</p>
                    <p className="text-xl font-extrabold text-amber-400">Rp {totalPrice.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                    <p className="text-xs text-amber-300 font-semibold mb-1">🏦 Transfer BCA:</p>
                    <div className="flex items-center justify-between bg-stone-950 px-3 py-2 rounded-lg border border-stone-800">
                      <span className="font-mono text-amber-400 font-bold">{bankAccount}</span>
                      <button onClick={handleCopyAccount} className="bg-amber-600 text-stone-950 text-xs font-bold px-3 py-1 rounded">{copied ? '✓ Copied!' : 'Copy'}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="my-auto text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
                <h3 className="text-xl font-bold text-white">Pesanan Dikonfirmasi!</h3>
                <button onClick={() => { setCart([]); setStep('cart'); setIsCartOpen(false); }} className="mt-6 bg-amber-600 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-sm w-full">Selesai</button>
              </div>
            )}

            {step === 'cart' && cart.length > 0 && (
              <div className="border-t border-stone-800 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-400 text-sm">Total:</span>
                  <span className="font-extrabold text-amber-400 text-lg">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <button onClick={() => {
                  if (!customerName || !customerPhone || !customerAddress) {
                    alert('Lengkapi data pengiriman dulu!');
                    return;
                  }
                  setStep('payment');
                }} className="w-full bg-amber-600 text-stone-950 py-3 rounded-xl font-bold text-sm cursor-pointer">Checkout →</button>
              </div>
            )}

            {step === 'payment' && (
              <div className="border-t border-stone-800 pt-4">
                <button onClick={() => setStep('success')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm cursor-pointer">✅ Konfirmasi Pembayaran</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}