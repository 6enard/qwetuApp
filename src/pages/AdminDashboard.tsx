import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    roomNumber: string;
    hostel: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  trackingStatus: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData: Order[] = [];
      snapshot.forEach((doc) => {
        orderData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(orderData);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        trackingStatus: newStatus,
        trackingUpdates: [{
          status: newStatus,
          timestamp: new Date().toISOString(),
          message: getStatusMessage(newStatus)
        }]
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Order is being prepared';
      case 'out_for_delivery':
        return 'Order is out for delivery';
      case 'delivered':
        return 'Order has been delivered successfully';
      default:
        return 'Order status updated';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'order_placed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedOrder === order.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`badge ${getStatusBadgeColor(order.trackingStatus)}`}>
                        {order.trackingStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>{order.customerInfo.name}</p>
                      <p>Room {order.customerInfo.roomNumber}, {order.customerInfo.hostel}</p>
                      <p className="font-medium mt-1">KES {order.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Actions</h2>
              
              {selectedOrder ? (
                <div className="space-y-4">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'preparing')}
                    className="btn w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Package size={18} />
                    Mark as Preparing
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'out_for_delivery')}
                    className="btn w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    <Truck size={18} />
                    Mark as Out for Delivery
                  </button>
                  
                  <button
                    onClick={() => updateOrderStatus(selectedOrder, 'delivered')}
                    className="btn w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle size={18} />
                    Mark as Delivered
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center">
                  Select an order to update its status
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;