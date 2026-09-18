const STEPS = [
  {
    title: "Find what you need",
    text: "Search by name or browse a category. Each product shows the strength, the pack size and the price."
  },
  {
    title: "Send your prescription",
    text: "For medicines marked Rx, a pharmacist calls you and receives your prescription on WhatsApp before dispensing."
  },
  {
    title: "Pay on delivery",
    text: "Pay the rider by MoMo or in cash. Delivery is free for orders of 30,000 RWF and above."
  }
];

/** Three ordered steps, so numbering here carries real meaning. */
const HowItWorks = () => (
  <section className="how" id="how-it-works">
    <h2>Ordering in three steps</h2>
    <ol className="how-list">
      {STEPS.map((step, index) => (
        <li key={step.title}>
          <span className="how-number">{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
