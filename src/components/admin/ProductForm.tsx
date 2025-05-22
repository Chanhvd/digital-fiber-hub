
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, FileText, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { productCategories } from '@/lib/utils';
import { productService } from '@/lib/productService';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductFormProps {
  product: any;
  isEditing: boolean;
  onBack: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, isEditing, onBack }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    code: '',
    description: '',
    fullDescription: '',
    imageUrl: 'https://placehold.co/400x300?text=Product+Image',
    category: 'odf',
    published: false,
    specifications: [
      { name: 'Dimensions', value: '' },
      { name: 'Weight', value: '' },
      { name: 'Material', value: '' },
      { name: 'Warranty', value: '' }
    ],
    features: [''],
    documents: [
      { name: 'Product Datasheet', url: '#' }
    ]
  });
  
  const [previewImage, setPreviewImage] = useState(formData.imageUrl);

  // Initialize form with product data if editing
  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        ...product,
        // Ensure all required fields are present
        specifications: product.specifications || formData.specifications,
        features: product.features || formData.features,
        documents: product.documents || formData.documents
      });
      setPreviewImage(product.imageUrl);
    }
  }, [isEditing, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const handleSpecificationChange = (index: number, field: 'name' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    const newSpecs = [...formData.specifications];
    newSpecs.splice(index, 1);
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleDocumentChange = (index: number, field: 'name' | 'url', value: string) => {
    const newDocs = [...formData.documents];
    newDocs[index][field] = value;
    setFormData(prev => ({ ...prev, documents: newDocs }));
  };

  const addDocument = () => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, { name: '', url: '#' }]
    }));
  };

  const removeDocument = (index: number) => {
    const newDocs = [...formData.documents];
    newDocs.splice(index, 1);
    setFormData(prev => ({ ...prev, documents: newDocs }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo purposes, we'll just use URL.createObjectURL
      // In a real app, you would upload this to a server
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      toast.error('Product title is required');
      return;
    }
    
    if (!formData.code.trim()) {
      toast.error('Product code is required');
      return;
    }

    try {
      if (isEditing) {
        productService.updateProduct(formData);
        toast.success('Product updated successfully');
      } else {
        productService.addProduct({
          ...formData,
          id: `product-${Date.now()}`, // Generate a unique ID
        });
        toast.success('Product created successfully');
      }
      onBack(); // Go back to product list
    } catch (error) {
      toast.error('An error occurred while saving the product');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-telecom-blue">
          {isEditing ? 'Edit Product' : 'Create New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details & Specs</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Name*</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleChange} 
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">Product Code*</Label>
                      <Input 
                        id="code" 
                        name="code" 
                        value={formData.code} 
                        onChange={handleChange} 
                        placeholder="E.g., ODF-R24"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description*</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleChange} 
                      placeholder="Brief description of the product"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <Textarea 
                      id="fullDescription" 
                      name="fullDescription" 
                      value={formData.fullDescription} 
                      onChange={handleChange} 
                      placeholder="Detailed product description"
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="published" 
                      checked={formData.published} 
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="published">Publish on website</Label>
                  </div>
                </div>
                
                <div>
                  <Label className="block mb-2">Product Image</Label>
                  <Card className="overflow-hidden">
                    <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                      <img 
                        src={previewImage} 
                        alt="Product preview" 
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Label htmlFor="image" className="cursor-pointer block w-full">
                        <div className="bg-telecom-blue text-white text-center py-2 px-4 rounded-md hover:bg-telecom-light-blue transition-colors">
                          Change Image
                        </div>
                        <Input 
                          id="image" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange}
                        />
                      </Label>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Technical Specifications</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSpecification}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </div>
                
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-4 items-start mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                      <div>
                        <Input 
                          placeholder="Specification name"
                          value={spec.name}
                          onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input 
                          placeholder="Specification value"
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpecification(index)}
                      className="text-red-500"
                      disabled={formData.specifications.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Product Features</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-center mb-4">
                    <div className="flex-grow">
                      <Input 
                        placeholder="Feature description"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-500"
                      disabled={formData.features.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Product Documents</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDocument}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
                
                {formData.documents.map((doc, index) => (
                  <div key={index} className="flex gap-4 items-start mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                      <div className="md:col-span-2">
                        <Input 
                          placeholder="Document name"
                          value={doc.name}
                          onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input 
                          placeholder="URL or link"
                          value={doc.url}
                          onChange={(e) => handleDocumentChange(index, 'url', e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                      className="text-red-500"
                      disabled={formData.documents.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="bg-telecom-light-gray p-4 rounded-md">
                <div className="flex gap-2 items-start">
                  <FileText className="h-5 w-5 text-telecom-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium">Document Upload</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      In this demo version, document management is simplified. 
                      In a production environment, you would have full file upload capabilities.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" className="bg-telecom-blue hover:bg-telecom-light-blue">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
