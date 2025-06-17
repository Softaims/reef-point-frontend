import { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaInfoCircle, FaSpinner } from "react-icons/fa";
import Logo from "../../assets/splashscreenReeflogo.png";

export default function DepositFundsPage() {
  // State management
  const [activeTab, setActiveTab] = useState("buy");
  const [payAmount, setPayAmount] = useState("450");
  const [payCurrency, setPayCurrency] = useState("CAD");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [showFeesCalculation, setShowFeesCalculation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(2772.59);
  const [priceUpdating, setPriceUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Dynamic fee calculation
  const networkFee = 15.5;
  const serviceFee = Number(payAmount) * 0.024; // 2.4% service fee
  const totalFees = networkFee + serviceFee;
  const netAmount = Number(payAmount) - totalFees;
  const receiveAmount = netAmount / exchangeRate;

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceUpdating(true);
      setTimeout(() => {
        // Simulate market fluctuation with small random changes
        const fluctuation = (Math.random() - 0.5) * 20;
        setExchangeRate((prev) =>
          Math.max(2700, Math.min(2850, prev + fluctuation))
        );
        setLastUpdated(new Date());
        setPriceUpdating(false);
      }, 600);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace(/[A-Z]{3}/, "");
  };

  // Handle payment submission
  const handleSkip = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Navigation logic would go here
    }, 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#2C024D]"
      style={{ backgroundColor: "#2C024D" }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <img
            src={Logo}
            alt="Reef Logo"
            className="w-[100px] h-auto sm:w-[120px]"
          />
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-gray-200 rounded-t-3xl mx-0 px-6 py-8">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Title */}
          <h3 className="text-[#000000] text-[16px] sm:text-lg font-bold">
            Would you like to deposit funds now?
          </h3>

          <div className=" bg-white p-4 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("buy")}
                  className={`px-4 py-2 text-lg font-medium  ${
                    activeTab === "buy"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setActiveTab("sell")}
                  className={`px-4 py-2 text-lg font-medium  transition-all ${
                    activeTab === "sell"
                      ? " border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Sell
                </button>
              </div>
              {/* <div className="flex gap-4  rounded-lg p-1 border border-gray-300">
              <button
                onClick={() => setActiveTab("buy")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === "buy"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveTab("sell")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === "sell"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Sell
              </button>
            </div> */}
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FaBars className="w-4 h-4" />
              </button>
            </div>

            {/* You Pay Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                You pay
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="flex-1 p-3 text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="0"
                />
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
                  <span className="text-red-500 font-bold">🍁</span>
                  <span className="font-medium text-gray-900">CAD</span>
                  <FaChevronDown className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Using payment method
              </label>

              {/* Card Payment Option */}
              <label
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors bg-white ${
                  selectedPaymentMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={selectedPaymentMethod === "card"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center space-x-2">
                    {/* Visa Icon */}
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    {/* Mastercard Icon */}
                    <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Card Payment
                    </span>
                  </div>
                </div>
                <div className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                  Pay
                </div>
              </label>

              {/* Google Pay Option */}
              <label
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors bg-white ${
                  selectedPaymentMethod === "googlepay"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="googlepay"
                    checked={selectedPaymentMethod === "googlepay"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">G</div>
                    <span className="text-sm font-medium text-gray-900">
                      Pay
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* Fees Calculation Toggle */}
            <button
              onClick={() => setShowFeesCalculation(!showFeesCalculation)}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <span>See fees calculation</span>
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${
                  showFeesCalculation ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Fees Details */}
            {showFeesCalculation && (
              <div className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network fee</span>
                  <span className="font-medium">
                    {formatCurrency(networkFee, payCurrency)} CAD
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee (2.4%)</span>
                  <span className="font-medium">
                    {formatCurrency(serviceFee, payCurrency)} CAD
                  </span>
                </div>
              </div>
            )}

            {/* Fee Summary */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">−</span>
                <span className="text-gray-600">
                  {formatCurrency(totalFees, payCurrency)} CAD
                </span>
                <span className="text-gray-500">Total fees</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700">÷</span>
                <div className="text-gray-600 flex items-center">
                  {priceUpdating && (
                    <FaSpinner className="animate-spin mr-1 text-blue-500 w-3 h-3" />
                  )}
                  <span>
                    {formatCurrency(exchangeRate, payCurrency)} CAD = 1 ETH
                  </span>
                </div>
                <div className="text-gray-500 flex items-center">
                  <span>Rate</span>
                  <FaInfoCircle className="w-3 h-3 text-gray-400 ml-1" />
                </div>
              </div>
            </div>

            {/* You Receive Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                You receive (estimate)
              </label>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={receiveAmount.toFixed(8)}
                    readOnly
                    className="w-full p-3 text-lg font-semibold bg-gray-50 border border-gray-300 rounded-lg text-gray-800"
                  />
                  {priceUpdating && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FaSpinner className="animate-spin text-blue-500 w-4 h-4" />
                    </div>
                  )}
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Ξ</span>
                  </div>
                  <span className="font-medium text-gray-900">ETH</span>
                  <FaChevronDown className="w-3 h-3 text-gray-500" />
                </button>
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                Ethereum Network
              </div>
            </div>
          </div>

          {/* Skip Button */}
          <div className="pt-4">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleSkip}
              className="w-full bg-gray-400 hover:bg-gray-500 text-black font-medium text-lg py-3 px-6 rounded-lg transition duration-200 disabled:opacity-70 flex items-center justify-center"
              style={{ backgroundColor: "#A29696" }}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Skip"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
