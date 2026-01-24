export default class Alert {
  constructor(parentSelector, dataSource) {
    // where to insert the section
    this.parentElement = document.querySelector(parentSelector);
    // gets the alert data
    this.dataSource = dataSource;
  }

  async showAlert() {
    const response = await fetch(this.dataSource);
    const alerts = await response.json();

    // is there's an alert message
    if (alert) {
      const section = document.createElement("section");
      section.classList.add("alert-list");

      alerts.forEach((alert) => {
        const alertContainer = document.createElement("p");
        alertContainer.textContent = alert.message;
        alertContainer.style.backgroundColor = alert.background;
        alertContainer.style.color = alert.color;

        section.appendChild(alertContainer);
      });

      this.parentElement.append(section);
    }
  }
}
