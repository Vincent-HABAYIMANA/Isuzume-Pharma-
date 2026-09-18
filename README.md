# Isuzume Pharma

An online pharmacy web application for Kigali, Rwanda. A customer can search the
catalogue, add medicines to a cart, and place a delivery order. Prescription
medicines are clearly marked, and the pharmacist confirms them before delivery.

Built with **React 18** and **Vite 5**.

**Author:** HABAYIMANA Vincent — Year 3 Computer and Software Engineering,
University of Rwanda, College of Science and Technology.

---

## 1. What the application does

| Feature | Description |
| --- | --- |
| Product catalogue | 28 medicines and medical devices with strength, dosage form, pack size, stock level and price in RWF. |
| Search | Live search by product name, description or category. |
| Filters | Filter by category, show prescription medicines only, sort by name or price. |
| Pagination | Eight products per page, with Previous / Next and the active page marked. |
| Shopping cart | Add, increase, decrease and remove items. Totals are recalculated automatically. |
| Saved cart | The cart is saved in the browser, so refreshing the page does not lose the order. |
| Prescription rules | Products that need a prescription show an **Rx** mark and a notice in the cart. |
| Checkout | Delivery form with full validation of name, Rwandan phone number, district and address. |
| Delivery fee | Fee depends on the district; free from 30,000 RWF. |
| Order confirmation | Each order gets a reference such as `ISZ-20260917-4821`. |
| States | Loading, error with a retry button, and an empty-result message are all handled. |

Accessibility and responsiveness are part of the build: every control has a
label, the cart dialog can be closed with `Esc`, the keyboard focus is always
visible, and the layout works from a small phone up to a desktop screen.

---

## 2. Running the project on Windows (PowerShell)

### Step 1 — Install Node.js

Install **Node.js 18 or newer** from <https://nodejs.org>. Check it:

```powershell
node --version
npm --version
```

### Step 2 — Open the project folder

```powershell
cd C:\Users\<your-name>\Downloads\isuzume-pharma
```

### Step 3 — Install the dependencies (only the first time)

```powershell
npm install
```

If PowerShell refuses to run `npm` with a script execution error, run this once
and then try again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### Step 4 — Start the development server

```powershell
npm run dev
```

The browser opens at <http://localhost:3000>. The page reloads by itself every
time you save a file. Press `Ctrl + C` in PowerShell to stop the server.

### Step 5 — Build the version you submit or deploy

```powershell
npm run build
npm run preview
```

`npm run build` creates a `dist` folder holding the finished website.
`npm run preview` opens that finished version so you can check it before you
upload it to Netlify, Vercel, GitHub Pages or a university server.

### Step 6 — Run the tests

```powershell
npm run test
```

Nine unit tests cover the shopping rules and the form validation.

---

## 3. Folder structure

```
isuzume-pharma/
├─ index.html                  Page shell: fonts, #root and #overlays
├─ package.json                Scripts and dependencies
├─ vite.config.js              Build configuration
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.jsx                 Entry point, mounts <App />
   ├─ App.jsx                  Page composition and the filter state
   ├─ assets/                  Images used by the interface
   ├─ components/
   │  ├─ layout/               Header, Hero, HowItWorks, Footer, CartButton
   │  ├─ catalog/              Catalog, CatalogToolbar, ProductCard, Pagination
   │  ├─ cart/                 CartPanel, CartItemRow, CheckoutForm
   │  └─ ui/                   Modal, FormField, DosageIcon
   ├─ context/
   │  ├─ CartContext.jsx       The context object
   │  ├─ CartProvider.jsx      Provides the cart to the whole application
   │  ├─ cartReducer.js        All shopping rules, as a pure function
   │  └─ cartReducer.test.js   Unit tests for those rules
   ├─ data/
   │  ├─ products.js           Product catalogue
   │  └─ districts.js          Delivery districts and fees
   ├─ hooks/
   │  ├─ useCart.js            Short access to the cart
   │  └─ useProducts.js        Loads the catalogue (loading / error / data)
   ├─ services/
   │  ├─ catalogService.js     Where the catalogue comes from
   │  └─ orderService.js       Where an order is sent
   ├─ styles/
   │  ├─ global.css            Colours, fonts, buttons, forms
   │  └─ app.css               Layout and component styles
   └─ utils/
      ├─ format.js             Price and order-reference formatting
      ├─ validation.js         Checkout validation rules
      └─ validation.test.js    Unit tests for those rules
```

### How the parts work together

```
main.jsx → App.jsx
              ├── CartProvider ──────── cartReducer (rules) ── localStorage
              ├── Header / CartButton ─ reads the cart through useCart
              ├── Hero  ─────────────── search box and category chips
              ├── Catalog ───────────── useProducts → catalogService → products.js
              │      └── ProductCard ── addItem()
              └── CartPanel ─────────── CheckoutForm → validation → orderService
```

---

## 4. Design decisions worth explaining in a defence

1. **The shopping rules live in a pure reducer.** `cartReducer.js` has no React
   code inside it, so the rules can be tested directly and the same file could
   be reused by a mobile application.
2. **Services sit between the interface and the data.** Components never import
   `products.js` for their data; they call `catalogService`. When a real
   Django or Node back-end is added, only the two files in `src/services`
   change.
3. **One source of truth for the filters.** `App.jsx` owns the filter state, so
   the search box in the hero and the toolbar above the grid can never disagree.
4. **Prices in RWF and Rwandan phone validation.** The application is built for
   customers in Kigali, so the money, the districts and the phone format follow
   local practice rather than a foreign template.
5. **Quantity limit per product.** A customer cannot order more than five units
   of one medicine online, which is closer to how a pharmacy really dispenses.

---

## 5. Limitations and future work

* Orders are stored in the browser, not on a server. `orderService.js` is the
  single place to plug in a real API.
* There is no customer account, order history page, or online payment yet;
  payment is on delivery.
* Prescription files are not uploaded through the site; the pharmacist collects
  them by phone.
* The interface is in English only. Kinyarwanda and French are the natural next
  step.

---

## 6. Licence

Released under the MIT Licence for academic use.
