
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      toast.error('Please log in to access the dashboard');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
    toast.info('You have been logged out');
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setActiveView('edit');
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setActiveView('create');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setEditingProduct(null);
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <div className="flex flex-col md:flex-row">
        <Sidebar 
          activeView={activeView} 
          onNavigate={setActiveView}
          onCreateProduct={handleCreateProduct}
        />
        <main className="flex-1 p-4 md:p-6">
          {activeView === 'list' && (
            <ProductList onEditProduct={handleEditProduct} onCreateProduct={handleCreateProduct} />
          )}
          {(activeView === 'create' || activeView === 'edit') && (
            <ProductForm 
              product={editingProduct} 
              isEditing={activeView === 'edit'} 
              onBack={handleBackToList} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
