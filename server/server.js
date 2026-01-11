import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
const PORT =  3001;

app.use(cors());
app.use(express.json());

// Endpoint to handle order submission
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

    // Insert order into Supabase
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
      console.error('Error inserting order:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }

    res.status(201).json({ 
      success: true, 
      data: data,
      message: 'Order submitted successfully' 
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
export { supabase };
