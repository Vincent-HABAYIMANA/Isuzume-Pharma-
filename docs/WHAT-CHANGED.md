# What changed between the first version and this one

This note records the problems found in the version submitted earlier and how
each one was solved. It is useful when the project has to be defended, because
a marker usually asks "what did you improve, and why?".

---

## A. Correctness bugs

| # | Problem in the old code | Why it mattered | Fix |
| --- | --- | --- | --- |
| A1 | In `CheckOut.js`, the form checked `enteredCity && enteredName && ...` instead of the validity results. | Any text passed, so an invalid postal code was still accepted. The validation looked like it worked but did nothing. | All rules moved to `src/utils/validation.js` and the form now submits only when every rule returns no message. Covered by unit tests. |
| A2 | Postal code had to be exactly five characters. | Rwanda does not use postal codes, so no customer could ever complete an order. | Replaced by the fields a rider really needs: district, sector or landmark, and a Rwandan phone number. |
| A3 | `CartProvider` returned `defaultCartState` for any unknown action. | A typo in an action name silently emptied the customer's cart. | The reducer now returns the current state for unknown actions, and every action name is a constant used in one place. |
| A4 | Removing an item reduced the total by the unit price even when several units were in the cart, and the total was recalculated by addition and subtraction. | Small rounding and logic errors built up and the displayed total could drift away from the real one. | Totals are recalculated from the item list after every change, so they can never drift. |
| A5 | `Model.js` read `document.getElementById("overlays")` when the module loaded. | If the element was missing or loaded later, the cart crashed the whole page. | The element is read when the dialog opens, and the dialog renders nothing if it is absent. |
| A6 | No limit tied to stock; the cart accepted any quantity. | The shop could sell medicine it did not have. | Quantity is capped by the stock level and by a maximum of five units per medicine. |

## B. Data and business logic

| # | Problem | Fix |
| --- | --- | --- |
| B1 | Products were downloaded from `fakestoreapi.com`, which returns clothes, jewellery and electronics. | A real pharmacy catalogue of 28 products with strength, dosage form, pack size, stock and prescription status now lives in `src/data/products.js`, served through `catalogService.js`. |
| B2 | Orders were posted to `foodapp-9c46f-default-rtdb.firebaseio.com`, a food-app database belonging to someone else, with no error handling. | `orderService.js` stores the order and returns an order reference. It is the one file to change when the back-end is ready. |
| B3 | Prices were shown in US dollars. | All prices are in Rwandan Francs, formatted through `formatPrice()`. |
| B4 | Every product used the same photo from an external website. | Each dosage form has its own drawn icon, so nothing has to be downloaded and the page loads instantly even on a slow connection. |
| B5 | Nothing distinguished a prescription medicine from an ordinary one. | Prescription items carry an Rx mark, a different card colour, a note on the card, and a notice in the cart. |
| B6 | No delivery information at all. | Six districts with their fees, free delivery from 30,000 RWF, and the fee shown in the cart before the order is confirmed. |

## C. Interface and content

| # | Problem | Fix |
| --- | --- | --- |
| C1 | The footer still advertised "Food and Burps 2020" with Indian, Chinese, Mexican and Italian recipe links. | Real pharmacy footer: address in Kimironko, phone, email, opening hours, and a health notice. |
| C2 | The header read `🏡PHARMACY` and the hero image had the alternative text "shoes store". | Proper brand mark, wording and alternative text everywhere. |
| C3 | The search box and the category selector did nothing, and the categories were the years 2020 to 2022. | Search, category filter, prescription filter and sorting all work and are tied to one filter state. |
| C4 | Pagination buttons read "1page", "2page", had no active state and no Previous or Next. | Rebuilt with a marked current page, working Previous and Next, and a results count. |
| C5 | No loading, error or empty state. If the request failed the page stayed blank. | All three states are handled, and the error state has a retry button. |
| C6 | `class=` was used instead of `className=`, and blocks of dead code sat in comments. | Valid JSX throughout, dead code removed, every file commented in plain English. |
| C7 | `console.log` calls ran on every render, including one reading "ici c paris". | All removed. |

## D. Project hygiene

| # | Problem | Fix |
| --- | --- | --- |
| D1 | `package.json` was still named `react-complete-guide`, with React 17 and `react-scripts` 4 (no longer maintained). | Renamed and described properly; React 18 with Vite 5, which installs faster and builds in about one second. |
| D2 | `src/assets` held about 15 MB of unrelated course material: EIA lecture slides, ISO 14001 PDFs, WhatsApp photos, a test answer key. | Removed. Only the two pharmacy images that the interface actually uses were kept. |
| D3 | `.eslintcache` was committed and `.gitignore` was thin. | Cache removed, `.gitignore` covers dependencies, builds, logs, editor files and environment files. |
| D4 | The README contained one line. | Full README with feature list, PowerShell instructions, folder map, design decisions and future work. |
| D5 | No tests. | Nine unit tests over the shopping rules and the validation rules: `npm run test`. |
| D6 | Everything named after "meals" from the tutorial the code came from. | Names now describe the pharmacy domain: `products`, `catalog`, `cart`, `prescription`. |

---

## Summary for a presentation slide

> The first version was a food-ordering tutorial with a pharmacy title on top of
> it: the products were clothes from a demo API, the orders went to someone
> else's food database, the checkout validation never blocked anything, and the
> footer sold Italian recipes. This version is a working pharmacy: a real
> catalogue with prescription rules, filters and search that work, a cart with
> stock limits, a validated Rwandan delivery form, delivery fees by district,
> order references, tests, and documentation.
