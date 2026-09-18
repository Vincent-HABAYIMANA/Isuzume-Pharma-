const Footer = () => (
  <footer className="site-footer" id="contact">
    <div className="footer-grid">
      <div>
        <h3>Isuzume Pharma</h3>
        <p>
          A community pharmacy serving Kigali and the surrounding districts with medicines,
          medical devices and pharmacist advice.
        </p>
      </div>

      <div>
        <h4>Pharmacy</h4>
        <ul>
          <li><a href="#catalogue">All medicines</a></li>
          <li><a href="#how-it-works">How ordering works</a></li>
          <li><a href="#catalogue">Delivery areas</a></li>
        </ul>
      </div>

      <div>
        <h4>Talk to a pharmacist</h4>
        <ul>
          <li>KG 11 Ave, Kimironko, Gasabo, Kigali</li>
          <li><a href="tel:+250788000000">+250 788 000 000</a></li>
          <li><a href="mailto:orders@isuzumepharma.rw">orders@isuzumepharma.rw</a></li>
        </ul>
      </div>

      <div>
        <h4>Opening hours</h4>
        <ul>
          <li>Monday to Saturday: 7:00 - 22:00</li>
          <li>Sunday and public holidays: 9:00 - 20:00</li>
          <li>Emergency line: 24 hours</li>
        </ul>
      </div>
    </div>

    <p className="footer-note">
      This website does not replace a medical consultation. If your symptoms are severe or do not
      improve, see a doctor or call 912.
    </p>

    <p className="footer-legal">
      &copy; {new Date().getFullYear()} Isuzume Pharma. Academic project by HABAYIMANA Vincent,
      University of Rwanda, College of Science and Technology.
    </p>
  </footer>
);

export default Footer;
