import CustomerOnboarding from "../models/CustomerOnboarding.js";

const customerController = {
  createCustomer: async (req, res) => {
    try {
      const {
        service,
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
        service,
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

      res.json({ user, message: "Customer onboarded successfully" });
    } catch (error) {
      console.error(error);
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

  getAllCustomerReports: async (req, res) => {
    try {
      const reports = await CustomerOnboarding.find().select(
        "name mobile email mobileMake mobileModel imeiNumber reference issue priceQuoted advancePay registeredDate expectedDeliveryDate comments status service"
      );

      res.json(reports);
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  updateServiceStatus: async (req, res) => {
    try {
      const { service } = req.params;
      let { advancePay, status, email, expectedDeliveryDate } = req.body;
      advancePay = Number(advancePay);

      const request = await CustomerOnboarding.findOneAndUpdate(
        { service },
        { status, advancePay, expectedDeliveryDate },
        { new: true }
      );

      res.json({ request, message: "Service status updated successfully" });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { service } = req.params;

      const customer = await CustomerOnboarding.findOne({ service });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      await CustomerOnboarding.findOneAndDelete({ service });

      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },

  getDetails: async (req, res) => {
    try {
      const { service } = req.params;
      const details = await CustomerOnboarding.findOne({ service });

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

      const service = customer.service || "";

      res.json({ service });
    } catch (error) {
      res.status(500).json({ error, message: "Internal server error" });
    }
  },
};

export default customerController;
