import postgres from 'postgres'; 


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    let errorMessage = 'Ocurrió un error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message; 
    } else if (typeof error === 'string') {
      errorMessage = error; 
    }
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}