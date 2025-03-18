
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, Lock, AlertCircle, Check, Apple, Wallet, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";

interface PaymentFormValues {
  paymentMethod: string;
  currency: string;
  amount: string;
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
  accountName?: string;
}

const PaymentSelection = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [paymentProvider, setPaymentProvider] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      paymentMethod: "card",
      currency: "USD",
      amount: "",
    },
  });

  // Currency options based on selected payment provider
  const getCurrencyOptions = () => {
    const currencies = {
      stripe: ["USD", "EUR", "GBP", "CAD", "AUD", "JPY"],
      flutterwave: ["NGN", "USD", "GHS", "KES", "ZAR", "UGX", "TZS"],
      paystack: ["NGN", "USD", "GHS"],
      wise: ["USD", "EUR", "GBP", "AUD", "CAD", "JPY", "SGD", "NZD"],
      payoneer: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"],
    };

    return currencies[paymentProvider as keyof typeof currencies] || ["USD"];
  };

  const handlePaymentSubmit = (values: PaymentFormValues) => {
    console.log("Payment values:", values);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      toast({
        title: "Payment Successful",
        description: `Payment of ${values.amount} ${values.currency} processed via ${paymentProvider.toUpperCase()}`,
        duration: 5000,
      });
      
      // Send confirmation email/SMS simulation
      console.log(`Sending payment confirmation to user...`);
      
      // Reset form after successful payment
      setTimeout(() => {
        setPaymentSuccess(false);
        form.reset();
        onClose();
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Secure Payment</CardTitle>
            <Lock className="h-5 w-5" />
          </div>
          <CardDescription className="text-white/80">
            Choose your preferred payment method
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 max-h-[70vh] overflow-y-auto">
          {paymentSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-muted-foreground">Your transaction has been processed successfully.</p>
              <p className="text-sm mt-4">A confirmation has been sent to your email and SMS.</p>
            </div>
          ) : (
            <>
              <Tabs defaultValue="gateway" className="w-full mb-6">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="gateway">Payment Gateway</TabsTrigger>
                  <TabsTrigger value="method">Payment Method</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gateway" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <PaymentProviderCard 
                      id="stripe" 
                      name="Stripe" 
                      description="Global payments"
                      icon={<Globe className="h-8 w-8 text-[#6772E5]" />} 
                      selected={paymentProvider === "stripe"} 
                      onClick={() => setPaymentProvider("stripe")} 
                    />
                    <PaymentProviderCard 
                      id="flutterwave" 
                      name="Flutterwave" 
                      description="Africa focused"
                      icon={<DollarSign className="h-8 w-8 text-[#FB4E20]" />} 
                      selected={paymentProvider === "flutterwave"} 
                      onClick={() => setPaymentProvider("flutterwave")} 
                    />
                    <PaymentProviderCard 
                      id="paystack" 
                      name="Paystack" 
                      description="African businesses"
                      icon={<DollarSign className="h-8 w-8 text-[#00C3F7]" />} 
                      selected={paymentProvider === "paystack"} 
                      onClick={() => setPaymentProvider("paystack")} 
                    />
                    <PaymentProviderCard 
                      id="wise" 
                      name="Wise" 
                      description="International transfers"
                      icon={<Globe className="h-8 w-8 text-[#00B9FF]" />} 
                      selected={paymentProvider === "wise"} 
                      onClick={() => setPaymentProvider("wise")} 
                    />
                    <PaymentProviderCard 
                      id="payoneer" 
                      name="Payoneer" 
                      description="Global B2B payments"
                      icon={<Globe className="h-8 w-8 text-[#FF4800]" />} 
                      selected={paymentProvider === "payoneer"} 
                      onClick={() => setPaymentProvider("payoneer")} 
                    />
                  </div>
                  
                  <Alert className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle>Security Information</AlertTitle>
                    <AlertDescription className="text-sm">
                      All payment information is encrypted and securely processed through the selected payment provider.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                
                <TabsContent value="method">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                              >
                                <PaymentMethodCard 
                                  id="card" 
                                  value="card"
                                  name="Credit Card" 
                                  icon={<CreditCard className="h-5 w-5" />} 
                                />
                                <PaymentMethodCard 
                                  id="apple-pay" 
                                  value="apple-pay"
                                  name="Apple Pay" 
                                  icon={<Apple className="h-5 w-5" />} 
                                />
                                <PaymentMethodCard 
                                  id="google-pay" 
                                  value="google-pay"
                                  name="Google Pay" 
                                  icon={<Wallet className="h-5 w-5" />} 
                                />
                                <PaymentMethodCard 
                                  id="bank-transfer" 
                                  value="bank-transfer"
                                  name="Bank Transfer" 
                                  icon={<Globe className="h-5 w-5" />} 
                                />
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {getCurrencyOptions().map((currency) => (
                                    <SelectItem key={currency} value={currency}>
                                      {currency}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="0.00" type="number" step="0.01" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {form.watch("paymentMethod") === "card" && (
                        <div className="space-y-4 pt-2">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="4242 4242 4242 4242" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="MM/YY" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cvc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVC</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="123" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {form.watch("paymentMethod") === "bank-transfer" && (
                        <div className="space-y-4 pt-2">
                          <FormField
                            control={form.control}
                            name="accountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Account holder name" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-4 pt-4">
                        <Button variant="outline" type="button" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-seftec-navy to-seftec-navy/90 dark:from-seftec-teal dark:to-seftec-purple text-white"
                        >
                          {isProcessing ? "Processing..." : "Pay Now"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-2" />
                  Secured by 256-bit encryption
                </div>
                <div className="flex gap-2">
                  {["stripe", "flutterwave", "paystack"].includes(paymentProvider) && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                      Instant Settlement
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    {paymentProvider === "wise" || paymentProvider === "payoneer" 
                      ? "International" 
                      : paymentProvider === "flutterwave" || paymentProvider === "paystack"
                        ? "Africa" 
                        : "Global"}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface PaymentProviderCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PaymentProviderCard: React.FC<PaymentProviderCardProps> = ({
  id, name, description, icon, selected, onClick
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`rounded-full p-2 ${selected ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
          {icon}
        </div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface PaymentMethodCardProps {
  id: string;
  value: string;
  name: string;
  icon: React.ReactNode;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  id, value, name, icon
}) => {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
      >
        {icon}
        <span className="mt-2 text-sm font-medium">{name}</span>
      </label>
    </div>
  );
};

export default PaymentSelection;
