import express from "express";
import cors from "cors";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
import path from "path";

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-5970767587849613-090220-8f39f498c0d6e5b03e974e863b3e4d66-1405302783",
});

const app = express();
const port = 8080;

const preference = new Preference(client);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "..", "client")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "..","client", "index.html"));
});

// Endpoint para crear una preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    if (!title || !quantity || !price) {
      throw new Error("Faltan datos en la solicitud");
    }

    const body = {
      items: [
        {
          title: title,
          quantity: Number(quantity),
          currency_id: "ARS",
          unit_price: Number(price),
        },
      ],
      back_urls: {
        success: "https://google.com",
        failure: "https://google.com",
        pending: "https://google.com",
      },
      auto_return: "approved",
    };

    console.log("Creando preferencia con:", body);

    const result = await preference.create({ body });

    console.log("Respuesta completa de Mercado Pago:", result);

    if (!result || !result.id) {
    throw new Error("La respuesta de Mercado Pago no contiene un ID");
    }

    console.log("Preferencia creada:", result.id);

    res.json({ id: result.id });
  } catch (error) {
    console.error("Error creando preferencia:", error.message);
    res.status(500).json({ error: "No se pudo crear la preferencia", details: error.message });
  }
});

// Endpoint para recibir feedback de MercadoPago
app.get("/feedback", (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:8080 🚀");
});