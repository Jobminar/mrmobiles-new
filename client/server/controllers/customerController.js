// customerController.js

import CustomerOnboarding from "../models/CustomerOnboarding.js";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.gmail,
    pass: process.env.gmail_password,
  },
});

const sendStatusEmail = async (
  serviceId,
  advancePay,
  status,
  recipientEmail,
  expectedDeliveryDate
) => {
  try {
    const mailOptions = {
      from: "elimillasrinivas@gmail.com",
      to: recipientEmail,
      subject: "Service Status Update",
      html: `
      <h3>Your Service ID: ${serviceId}</h3>
      <h4>Your service status has been updated to <span style='color:green;'>${status}</span></h4>
      <p><b>Expected Delivery Date</b> : ${expectedDeliveryDate}</p>
      <p><b>Advance Paid</b> : ${advancePay}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendCustomerOnboardingEmail = async (
  serviceId,
  userEmail,
  status,
  imeiNumber,
  mobilemodel,
  priceQuoted,
  advancePay,
  expectedDeliveryDate
) => {
  try {
    const mailOptions = {
      from: "elimillasrinivas@gmail.com",
      to: userEmail,
      subject: "Mr.Mobiles Services",
      html: `
      <center>
        <h3>Thank you for choosing Mr.Mobiles services</h3>
        <p><b>Your Service ID :</b> ${serviceId}</p>
        <p><b>Your Device IMEI:</b> ${imeiNumber}</p>
        <p><b>Your Device Model :</b> ${mobilemodel}</p>
        <p><b>Price Quotated :</b> ${priceQuoted}</p>
        <p><b>Advance Paid :</b> ${advancePay}</p>
        <p><b>Advance Paid :</b> ${expectedDeliveryDate}</p>
        <p><b>Your Service Status :</b> <span style='color:green'>${status}</span></p>
      </center>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const customerController = {
  getDetails: async (req, res) => {
    try {
      const { serviceId } = req.params;
      const details = await CustomerOnboarding.findOne({ serviceId });
      if (!details) {
        return res
          .status(404)
          .json({ error: "You have not booked any of our services." });
      }
      res.json(details);
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const {
        serviceId,
        name,
        mobile,
        email,
        mobileMake,
        mobileModel,
        imeiNumber,
        reference,
        issue,
        priceQuoted,
        advancePay,
        registeredDate,
        expectedDeliveryDate,
        comments,
      } = req.body;

      const user = new CustomerOnboarding({
        serviceId,
        name,
        mobile,
        email,
        mobileMake,
        mobileModel,
        imeiNumber,
        reference,
        issue,
        priceQuoted,
        advancePay,
        registeredDate,
        expectedDeliveryDate,
        comments,
      });

      await user.save();
      sendCustomerOnboardingEmail(
        user.serviceId,
        user.email,
        user.status,
        user.imeiNumber,
        user.mobileModel,
        user.priceQuoted,
        user.advancePay,
        user.expectedDeliveryDate
      );

      res.json({ user, message: "Customer onboarded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  getCustomerReports: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      let query = {};
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        query.registeredDate = {
          $gte: start,
          $lte: end,
        };
      }

      const reports = await CustomerOnboarding.find(query).select(
        "name mobile email mobileMake mobileModel imeiNumber reference issue priceQuoted advancePay registeredDate expectedDeliveryDate comments status"
      );

      res.json(reports);
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  updateServiceStatus: async (req, res) => {
    try {
      const { serviceId } = req.params;
      let { advancePay, status, email, expectedDeliveryDate } = req.body;
      advancePay = Number(advancePay);

      const request = await CustomerOnboarding.findOneAndUpdate(
        { serviceId },
        { status, advancePay, expectedDeliveryDate },
        { new: true }
      );

      await sendStatusEmail(
        serviceId,
        advancePay,
        status,
        email,
        expectedDeliveryDate
      );

      res.json({ request, message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { serviceId } = req.params;

      const customer = await CustomerOnboarding.findOne({ serviceId });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      await CustomerOnboarding.findOneAndDelete({ serviceId });

      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  getDetails: async (req, res) => {
    try {
      const { serviceId } = req.params;
      const details = await CustomerOnboarding.findOne({ serviceId });

      if (!details) {
        return res
          .status(404)
          .json({ error: "You have not booked any of our services." });
      }

      res.json(details);
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },
  getServiceIdByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const customer = await CustomerOnboarding.findOne({ email });

      if (!customer) {
        return res
          .status(404)
          .json({ error: "Customer not found with the provided email" });
      }

      const serviceId = customer.serviceId || ""; // Use an empty string if serviceId is undefined

      res.json({ serviceId });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },
};

export default customerController;
