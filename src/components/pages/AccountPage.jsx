import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Package, MapPin, LogOut, Edit3, Save, X, Loader2,
  ChevronRight, ShoppingBag, Clock, CheckCircle, Truck, AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useView } from "../../context/ViewContext";
import { formatPrice } from "../../utils/formatPrice";

const AccountPage = () => {
  const { customer, isAuthenticated, signOut, updateProfile, loading, initializing } = useAuth();
  const { setCurrentPage } = useView();
  const [activeTab, setActiveTab] = useState("orders");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!initializing && !isAuthenticated) {
      setCurrentPage("login");
    }
  }, [isAuthenticated, initializing, setCurrentPage]);

  const handleSignOut = async () => {
    await signOut();
    setCurrentPage("home");
  };

  const startEditing = () => {
    setEditData({
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    const result = await updateProfile(editData);
    if (result.success) {
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (!customer) return null;

  const orders = customer.orders?.edges?.map((e) => e.node) || [];
  const addresses = customer.addresses?.edges?.map((e) => e.node) || [];

  const getStatusBadge = (status) => {
    const styles = {
      PAID: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
      REFUNDED: { bg: "bg-gray-100", text: "text-gray-700", icon: AlertCircle },
      FULFILLED: { bg: "bg-blue-100", text: "text-blue-700", icon: Truck },
      UNFULFILLED: { bg: "bg-orange-100", text: "text-orange-700", icon: Package },
      PARTIALLY_FULFILLED: { bg: "bg-orange-100", text: "text-orange-700", icon: Truck },
    };
    const style = styles[status] || styles.PENDING;
    const Icon = style.icon;
    const label = status?.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const tabs = [
    { id: "orders", label: "Orders", icon: Package, count: orders.length },
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin, count: addresses.length },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 pb-20 px-6 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Account Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hi, {customer.firstName || "there"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{customer.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-px overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    When you place an order, it will appear here.
                  </p>
                  <button
                    onClick={() => setCurrentPage("collections")}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    Start Shopping
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const lineItems = order.lineItems?.edges?.map((e) => e.node) || [];
                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-sm font-semibold text-gray-900">
                              {order.name}
                            </span>
                            <span className="text-sm text-gray-400 ml-3">
                              {new Date(order.processedAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(order.financialStatus)}
                            {order.fulfillmentStatus && getStatusBadge(order.fulfillmentStatus)}
                          </div>
                        </div>

                        <div className="space-y-3">
                          {lineItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              {item.variant?.image?.url ? (
                                <img
                                  src={item.variant.image.url}
                                  alt={item.variant.image.altText || item.title}
                                  className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                                  <Package className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.title}
                                </p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              {item.variant?.price && (
                                <span className="text-sm font-medium text-gray-900">
                                  {formatPrice(parseFloat(item.variant.price.amount))}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">Total</span>
                          <span className="text-base font-semibold text-gray-900">
                            {order.totalPrice?.currencyCode}{" "}
                            {parseFloat(order.totalPrice?.amount).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  {!editing ? (
                    <button
                      onClick={startEditing}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(false)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-1 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save
                      </button>
                    </div>
                  )}
                </div>

                {saveSuccess && (
                  <div className="bg-green-50 text-green-700 text-sm rounded-lg p-3 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Profile updated successfully.
                  </div>
                )}

                {editing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => setEditData((p) => ({ ...p, firstName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => setEditData((p) => ({ ...p, lastName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="+31 6 1234 5678"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Name</p>
                      <p className="text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-gray-900">{customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-gray-900">{customer.phone || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Member Since</p>
                      <p className="text-gray-900">
                        {new Date(customer.createdAt).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {addresses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No saved addresses</h3>
                  <p className="text-gray-500 text-sm">
                    Your shipping addresses will appear here after your first order.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr, idx) => {
                    const isDefault = customer.defaultAddress?.id === addr.id;
                    return (
                      <div
                        key={addr.id || idx}
                        className={`bg-white rounded-2xl border p-6 ${
                          isDefault ? "border-green-200 bg-green-50/30" : "border-gray-100"
                        }`}
                      >
                        {isDefault && (
                          <span className="inline-block text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full mb-3">
                            Default
                          </span>
                        )}
                        <p className="text-sm text-gray-900">{addr.address1}</p>
                        {addr.address2 && (
                          <p className="text-sm text-gray-900">{addr.address2}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {addr.city}
                          {addr.province ? `, ${addr.province}` : ""} {addr.zip}
                        </p>
                        <p className="text-sm text-gray-600">{addr.country}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AccountPage;
