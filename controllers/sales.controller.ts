// @ts-nocheck
import { prisma } from "../prisma/prismaClient";
import { RequestType } from "..";
import { Response } from "express";
import { sendEmail } from "../utils/mail";
// import { toASCII } from "punycode";
import { Prisma, User } from "@prisma/client/default";

export const createSales = async (req: RequestType, res: Response) => {
  const { items, quantities, prices, costs, paymentType, customerId, discount } = req.body;
  const user: User = req.user;
  const bussinessId: string | null = user?.bussinessId || null;
  const shopId = user?.shopId; // This could be undefined

  let totalCost = 0;
  let totalPrice = 0;

  for (let i = 0; i < items.length; i++) {
    totalCost += costs[i] * quantities[i];
    totalPrice += prices[i] * quantities[i];
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        totalCost,
        totalPrice: totalPrice - discount,
        prices,
        quantities,
        shop: shopId ? { connect: { id: shopId } } : undefined, // Proper conditional
        bussinessId,
        items: items.map((item: any) => item.name),
        paymentType,
        customerId,
        status: "unconfirmed",
        userId: user.id,
      },
    });

    if (paymentType === "Wallet") {
      await prisma.customer.update({
        where: { id: customerId },
        data: { walletBalance: { decrement: totalPrice - discount } }
      });
    }

    const fullInvoice = await prisma.invoice.findUnique({
      where: { id: invoice.id },
      include: { shop: true, bussiness: true }
    });

    await prisma.sales.create({
      data: {
        total: totalPrice - discount,
        invoiceId: invoice.id,
      },
    });

    // Update products quantities
    for (const item of items) {
      await prisma.items.update({
        where: { id: item.id },
        data: { quantity: { decrement: parseInt(quantities[items.indexOf(item)]) } }
      });
    }

    return res.status(201).json(fullInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return res.status(500).json({ error: "Failed to create invoice or sales." });
  }
};


export const getTodaysSales = async (req: RequestType, res: Response) => {
  try {
    req;
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todaysSales = await prisma.sales.findMany({
      where: { createdAt: { gte: start, lt: end } },
      include: {invoice: true},
    });

    return res.status(200).json(todaysSales);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTotalSalesByPeriod = async (req: RequestType, res: Response) => {
  try {
    const period = req.query.period as "day" | "week" | "month";

    if (!["day", "week", "month"].includes(period)) {
      return res.status(400).json({ error: "Invalid period. Use 'day', 'week', or 'month'." });
    }

    const today = new Date();
    let start: Date;
    let end: Date;

    if (period === "day") {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    } else if (period === "week") {
      const dayOfWeek = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - dayOfWeek);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 7);
    } else {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    }

    const sales = await prisma.sales.findMany({
      where: { createdAt: { gte: start, lt: end } },
    });

    const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);

    return res.status(200).json({ period, totalSales });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};


export const getSalesDataStats = async (req: RequestType, res: Response) => {
  try {
    const sales = await prisma.sales.findMany();
    const customers = await prisma.customer.findMany();
    const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
    const totalCustomers = customers.length;
    const customersWithDebts = customers.filter((customer) => customer.walletBalance < 0)
    const customerDebts = customersWithDebts.reduce((acc, customer) => acc - customer.walletBalance, 0);
    const averageSaleValue = totalSales / sales.length;
    const lastMonthSales = await prisma.sales.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });
    const lastMonthTotalSales = lastMonthSales.reduce((acc, sale) => acc + sale.total, 0);
    const salesGrowth = (totalSales - lastMonthTotalSales) / lastMonthTotalSales * 100;

    return res.status(200).json({ totalSales, totalCustomers, customerDebts, averageSaleValue, salesGrowth });

    
  }catch(err:any){
    return res.json({error: err.message}).status(500)
  }
}

export const calculateTotalProfit = async (req: RequestType, res: Response) => {
    try {
      const invoices = await prisma.invoice.findMany();
      req;
      const totalProfit = invoices.reduce((acc, invoice) => {
        return acc + (invoice.totalPrice - invoice.totalCost);
      }, 0);
  
      return res.status(200).json({ totalProfit });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };


export const getAllSales = async (req: RequestType, res: Response) => {
    try {
      const user = req.user;
      const filter = req.query;
      if(req?.user.role !== 'admin') filter.shopId = user?.shopId
      const sales = await prisma.sales.findMany({
        where: filter,
        include: { invoice: true },
      });
      return res.status(200).json(sales);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  export const getOneSale = async (req: RequestType, res: Response) => {
    try {
      const { id } = req.params;
      const filter:any = {
        id
      };
      if(req?.user.role !== 'admin') filter.shopId = req.user?.shopId
      const sale = await prisma.sales.findFirst({
        where: filter,
        include: { invoice: true },
      });
      return res.status(200).json(sale);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  export const getInvoices = async (req: RequestType, res: Response) => {
    try {
      const user = req.user;
      const filter = req.query;
      // if(req?.user?.role !== 'admin') {filter.shopId = user?.shopId;};
      // if(req?.user?.role === 'staff') {filter.userId = user?.id};
      const invoices = await prisma.invoice.findMany({
        where: filter,
        include: {customer:true}
      });
      return res.status(200).json(invoices);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  export const getOneInvoice = async (req: RequestType, res: Response) => {
    try {
      const { id } = req.params;
      const filter:any = {
        id
      };
      if(req?.user.role !== 'admin') filter.shopId = req.user?.shopId
      const invoice = await prisma.invoice.findFirst({
        where: filter,
        include: {customer:true, shop: true}
      });
      return res.status(200).json(invoice);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  };

  export const updateInvoice = async (req: RequestType, res: Response) => {
    try{
      const {id} = req.params;
      const body = req.body;
      const invoice = await prisma.invoice.update({
        where: {
          id
        },
        data: body
      });
      return res.json(invoice).status(200);
    }catch(err:any){
      return res.json({error: err.message}).status(500);
    }
  }


  export const sendInvoiceConfirmationOTP = async (req: RequestType, res: Response) => {
    try {
      const email = req.user?.email;
      const {code} = req.body;
      await sendEmail(email, "Invoice Confirmation", `Your Invoice Confirmation OTP is ${code}`);
      return res.status(201).json({ message: "OTP sent successfully", email: req.user?.email });
  }catch (err: any) {
      return res.status(500).json({ error: err.message });
  }
  }


  export const getDashboardStats = async (req: RequestType, res: Response) => {
    try{
      // const user = req.user;
      const filter = req.query ?? {};
      const user = req.user;

      if(req?.user.role !== 'admin') filter.shopId = user?.shopId;
      if(req?.user.role === 'staff') filter.userId = user?.id;
      //get total sales
      const totalSales =  (await prisma.sales.aggregate({
        
        _sum: {
          total: true
        },
        where: filter
      }))._sum.total;
      
      //total revenue
      const totalPrice = await prisma.invoice.aggregate({
        _sum: {
          totalPrice: true
        },
        where: filter
      });
      const totalCost = await prisma.invoice.aggregate({
        _sum: {
          totalCost: true
        },
        where: filter
      });
      const totalProfit = totalPrice._sum.totalPrice - totalCost._sum.totalCost;
      //total Sales costs
      const totalSalesCost = totalCost._sum.totalCost;
      
      //total purchases
      const totalPurchases = '******';
      //total returns
      //total purchase cost
      const totalPurchaseCost  = (await prisma.items.aggregate({
        _sum: {
          cost: true,
          quantity: true
        }
      }))._sum.cost * (await prisma.items.aggregate({
        _sum: {
          quantity: true
        }
      }))._sum.quantity;
      //total quantity
      const totalQuantity = (await prisma.items.aggregate({
        _sum: {
          quantity: true
        }
      }))._sum.quantity;

      //total pending invoices
      const totalPendingInvoices = await prisma.invoice.count({
        where: {
          status: "unconfirmed",
          ...filter
        }
      });
      const totalPendingInvoicesCost = await (await prisma.invoice.aggregate({
        _sum: {
          totalCost: true,
          totalPrice: true
        },
        where: {
          status: "unconfirmed",
          ...filter
        }
      }))._sum.totalPrice;

      //total customers
      const totalCustomers = await prisma.customer.count();
      //total suppliers
      const totalSuppliers = await prisma.supplier.count();
      //total employees
      const totalEmployees = await prisma.user.count();
      //total products
      const totalProducts = await prisma.items.count();
      
      //out of stock
      const outOfStock = await prisma.items.count({
        where: {
          quantity: {
            lte: 0
          }
        }
      });
      //low stock
      const products = await prisma.items.findMany({
        
      });

    
      const lowStock = products.filter((product) => product.quantity <= product.reorderQuantity && product.quantity > 0).length;
      //low stock
      return res.json({
        totalSales,
        totalSalesCost,
        totalPurchases,
        totalPurchaseCost,
        totalProfit,
        totalQuantity,
        totalPendingInvoices: (`${totalPendingInvoices} = NGN ${totalPendingInvoicesCost?.toLocaleString() || 0}`),
        totalCustomers,
        totalSuppliers,
        totalEmployees,
        totalProducts,
        outOfStock,
        lowStock
      })
    }catch(err:any){
      return res.json({error: err.message}).status(500);
    }
  }


  export const lineChart = async (req: RequestType, res: Response) => {
    try {
      const filter = req.query;
      const sales = await prisma.sales.groupBy({
        by: ['createdAt'],
        _sum: {
          total: true,
        },
        where: filter,
      });
      
      const profitData = await prisma.invoice.groupBy({
        by: ['createdAt'],
        _sum: {
          totalCost: true,
          totalPrice: true,
        },
        where: filter,
      });
      
      // Function to group data by month
      function groupByMonth(data:any, valueKey:any) {
        const grouped = {} as any;
        data.forEach((item:any) => {
          const month = new Date(item.createdAt)?.toLocaleString('default', { month: 'short' }).toUpperCase();
          grouped[month] = (grouped[month] || 0) + (item._sum[valueKey] || 0);
        });
        return grouped;
      }
      
      // Group sales data by month
      const salesByMonth = groupByMonth(sales, 'total');
      
      // Group profit data by month
      const profitByMonth:any = {};
      profitData.forEach((item) => {
        const month = new Date(item.createdAt)?.toLocaleString('default', { month: 'short' }).toUpperCase();
        const totalPrice = item._sum.totalPrice || 0;
        const totalCost = item._sum.totalCost || 0;
        const profit = totalPrice - totalCost;
        profitByMonth[month] = (profitByMonth[month] || 0) + profit;
      });
      
   
      
      return res.json({salesByMonth, profitByMonth}).status(200);
    } catch (err: any) {
      return res.json({ error: err.message }).status(500);
    }
  };

  export const handleReturn = async (req: RequestType, res: Response) => {
    try{
      const {invoiceId, items, quantities, prices, totalCost, totalPrice, customerId} = req.body;
      // const user = req.user;

      const invoice = await prisma.invoice.create({
        data: {
          totalCost,
          totalPrice: 0 - totalPrice,
          prices,
          quantities,
          items,
          paymentType:"return",
          customerId,
          status: "unconfirmed",
        },
      });

      return res.json(invoice).status(200);
    }catch(err:any){
      return res.json({error: err.message}).status(500);
    }
  }

  export const handleDeleteInvoice = async (req: RequestType, res: Response) => {
    try{
      // const user = req.user;
      // if(req.user?.role !== "admin") return res.json({error: "You are not authorized to perform this action"}).status(401);
      const id = req.params.id;
      const invoice = await prisma.invoice.delete({where: {id}});
      return res.json(invoice).status(200);
    }catch(err:any){
      return res.json({error: err.message}).status(500);
    }
  }