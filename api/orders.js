import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client (from Vercel env vars)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const {
      Full_Name,
      Phone_Number,
      Email_Address,
      Delivery_Address,
      City,
      Additional_Notes,
      Product_Name,
      Quantity,
      Price
    } = req.body;

    const { data, error } = await supabase
      .from('Client')
      .insert([{
        Full_Name,
        Phone_Number,
        Email_Address,
        Delivery_Address,
        City,
        Additional_Notes,
        Product_Name,
        Quantity: parseInt(Quantity),
        Price: parseFloat(Price)
      }]);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    return res.status(201).json({
      success: true,
      data,
      message: 'Order submitted successfully'
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Health check
app.get('/api', (req, res) => {
  res.send('API is running');
});

// IMPORTANT: export app (NO listen)
export default app;
