// Email Templates
export const emailTemplates = {
  welcome: {
    subject: 'Willkommen bei Power! ⚡',
    html: `
      <h1>Willkommen bei Power!</h1>
      <p>Hallo {{firstName}},</p>
      <p>willkommen bei Power - deinem intelligenten Energiemanagement!</p>
      <p>Mit Power kannst du:</p>
      <ul>
        <li>Deinen Stromverbrauch in Echtzeit sehen</li>
        <li>Deine Geräte automatisch optimieren</li>
        <li>Bis zu 25% bei deiner Stromrechnung sparen</li>
      </ul>
      <p><a href="{{dashboardUrl}}">Jetzt starten</a></p>
      <p>Bei Fragen antworten wir dir gerne unter support@power.energy</p>
      <p>Dein Power Team</p>
    `,
  },
  
  invoice: {
    subject: 'Neue Rechnung von Power - {{invoiceNumber}}',
    html: `
      <h1>Neue Rechnung</h1>
      <p>Hallo {{firstName}},</p>
      <p>deine neue Rechnung ist da:</p>
      <ul>
        <li>Rechnungsnummer: {{invoiceNumber}}</li>
        <li>Betrag: {{amount}}</li>
        <li>Fällig bis: {{dueDate}}</li>
      </ul>
      <p><a href="{{invoiceUrl}}">Rechnung ansehen</a></p>
    `,
  },
  
  optimizationComplete: {
    subject: 'Optimierung abgeschlossen - {{savings}}€ gespart!',
    html: `
      <h1>Optimierung fertig!</h1>
      <p>Hallo {{firstName}},</p>
      <p>deine automatische Optimierung ist abgeschlossen.</p>
      <p><strong>Ergebnis:</strong></p>
      <ul>
        <li>Monatliche Ersparnis: {{savings}}€</li>
        <li>Neuer Eigenverbrauch: {{selfConsumption}}%</li>
      </ul>
      <p><a href="{{dashboardUrl}}">Details ansehen</a></p>
    `,
  },
  
  priceAlert: {
    subject: '⚡ Strompreis-Alert: {{price}}€/kWh',
    html: `
      <h1>Preis-Alert</h1>
      <p>Hallo {{firstName}},</p>
      <p>Der Strompreis ist gerade besonders günstig!</p>
      <ul>
        <li>Aktueller Preis: {{price}}€/kWh</li>
        <li>Durchschnitt: {{averagePrice}}€/kWh</li>
        <li>Zeit: {{timestamp}}</li>
      </ul>
      <p>Jetzt ist der beste Zeitpunkt für:</p>
      <ul>
        <li>Wäsche waschen</li>
        <li>Geschirrspüler starten</li>
        <li>Batterie laden</li>
      </ul>
    `,
  },
};

// SMS Templates
export const smsTemplates = {
  verification: 'Dein Power Verifizierungscode: {{code}}',
  
  deviceOffline: '⚠️ Gerät {{deviceName}} ist offline. Bitte überprüfe die Verbindung.',
  
  criticalAlert: '🚨 Kritischer Alert: {{message}}. Bitte umgehend überprüfen: {{link}}',
};

// Push Notification Templates
export const pushTemplates = {
  optimizationComplete: {
    title: '⚡ Optimierung abgeschlossen',
    body: 'Du sparst jetzt {{savings}}€ im Monat!',
  },
  
  priceDrop: {
    title: '💰 Strompreis gerade günstig!',
    body: 'Aktuell nur {{price}}€/kWh - 50% unter dem Durchschnitt',
  },
  
  deviceAlert: {
    title: '⚠️ Gerät braucht Aufmerksamkeit',
    body: '{{deviceName}}: {{message}}',
  },
};
