import React, { useState, useEffect } from "react";
import {
    CreditCard,
    Plus,
    MoreVertical,
    Eye,
    EyeOff,
    Edit2,
    Trash2,
    Lock,
    Unlock,
    X,
    Loader2,
} from "lucide-react";
import { cardService } from "../../services/api";
import toast from "react-hot-toast";

const CardsPage = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [formData, setFormData] = useState({
        cardType: "debit",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        label: "",
        balance: 0,
        limit: 100000,
    });

    // Fetch cards
    const fetchCards = async () => {
        try {
            setLoading(true);
            const response = await cardService.getAll();
            if (response.success) {
                setCards(response.cards);
            }
        } catch (error) {
            console.error("Error fetching cards:", error);
            toast.error("Failed to load cards");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    // Handle add card
    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            const response = await cardService.create(formData);
            if (response.success) {
                toast.success("Card added successfully!");
                setShowAddModal(false);
                resetForm();
                fetchCards();
            }
        } catch (error) {
            toast.error(error.message || "Failed to add card");
        }
    };

    // Handle edit card
    const handleEditCard = async (e) => {
        e.preventDefault();
        try {
            const response = await cardService.update(selectedCard._id, {
                label: formData.label,
                limit: formData.limit,
            });
            if (response.success) {
                toast.success("Card updated successfully!");
                setShowEditModal(false);
                setSelectedCard(null);
                resetForm();
                fetchCards();
            }
        } catch (error) {
            toast.error(error.message || "Failed to update card");
        }
    };

    // Handle delete card
    const handleDeleteCard = async (cardId) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;

        try {
            const response = await cardService.delete(cardId);
            if (response.success) {
                toast.success("Card deleted successfully!");
                fetchCards();
            }
        } catch (error) {
            toast.error(error.message || "Failed to delete card");
        }
    };

    // Handle toggle card status
    const handleToggleStatus = async (cardId, newStatus) => {
        try {
            const response = await cardService.toggleStatus(cardId, newStatus);
            if (response.success) {
                toast.success(`Card ${newStatus} successfully!`);
                fetchCards();
            }
        } catch (error) {
            toast.error(error.message || "Failed to update card status");
        }
    };

    const resetForm = () => {
        setFormData({
            cardType: "debit",
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
            label: "",
            balance: 0,
            limit: 100000,
        });
    };

    const openEditModal = (card) => {
        setSelectedCard(card);
        setFormData({
            label: card.label,
            limit: card.limit,
        });
        setShowEditModal(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Cards</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your payment cards and view transactions
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New Card
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <div
                        key={card._id}
                        className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg text-white overflow-hidden group"
                    >
                        {/* Card Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
                        </div>

                        {/* Card Content */}
                        <div className="relative z-10">
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">{card.label}</p>
                                    <p className="mt-1 text-sm font-medium capitalize">{card.cardType} Card</p>
                                </div>
                                <div className="relative">
                                    <button className="p-1 hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                    {/* Dropdown menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-20">
                                        <button
                                            onClick={() => openEditModal(card)}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit Card
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleToggleStatus(
                                                    card._id,
                                                    card.status === "active" ? "frozen" : "active"
                                                )
                                            }
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            {card.status === "active" ? (
                                                <>
                                                    <Lock className="w-4 h-4" />
                                                    Freeze Card
                                                </>
                                            ) : (
                                                <>
                                                    <Unlock className="w-4 h-4" />
                                                    Unfreeze Card
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCard(card._id)}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Card
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card Number */}
                            <div className="mb-6">
                                <p className="text-xs text-gray-400 mb-1">Card Number</p>
                                <p className="text-lg font-mono tracking-wider">
                                    •••• •••• •••• {card.last4}
                                </p>
                            </div>

                            {/* Card Details Row */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Balance</p>
                                    <p className="text-xl font-semibold">
                                        {showBalance ? `₹${(card.balance / 100).toLocaleString()}` : "••••••"}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Expiry</p>
                                    <p className="text-sm font-mono">{card.expiryDate}</p>
                                </div>
                            </div>

                            {/* Card Status */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded ${card.status === "active"
                                                ? "bg-emerald-500/20 text-emerald-300"
                                                : card.status === "frozen"
                                                    ? "bg-blue-500/20 text-blue-300"
                                                    : "bg-red-500/20 text-red-300"
                                            }`}
                                    >
                                        {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                    </span>
                                    <CreditCard className="w-8 h-8 text-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Card Statistics */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Total Cards</p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{cards.length}</p>
                    <p className="mt-1 text-sm text-gray-500">
                        {cards.filter((c) => c.status === "active").length} active
                    </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-gray-600">Total Balance</p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                        ₹{(cards.reduce((sum, c) => sum + c.balance, 0) / 100).toLocaleString()}
                    </p>
                    <p className="mt-1 text-sm text-emerald-600">Available across all cards</p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Show Balance</p>
                            <p className="mt-1 text-xs text-gray-500">Toggle card balances</p>
                        </div>
                        <button
                            onClick={() => setShowBalance(!showBalance)}
                            className={`p-2 rounded-lg transition-colors ${showBalance ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Card Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add New Card</h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddCard} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                                <select
                                    value={formData.cardType}
                                    onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value="debit">Debit Card</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="virtual">Virtual Card</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <input
                                    type="text"
                                    value={formData.cardNumber}
                                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="16"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                                <input
                                    type="text"
                                    value={formData.cardHolder}
                                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <input
                                        type="text"
                                        value={formData.expiryDate}
                                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                    <input
                                        type="text"
                                        value={formData.cvv}
                                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                        placeholder="123"
                                        maxLength="3"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Label</label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    placeholder="My Card"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                                >
                                    Add Card
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Card Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Card</h3>
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setSelectedCard(null);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditCard} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Label</label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Spending Limit</label>
                                <input
                                    type="number"
                                    value={formData.limit}
                                    onChange={(e) => setFormData({ ...formData, limit: parseInt(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedCard(null);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardsPage;
