
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, Wallet, Building2, CheckCircle2, XCircle, Loader2, Smartphone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import "./BillingPayment.scss";

interface BillingPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentStage = "selection" | "processing" | "success" | "failure";

export default function BillingPayment({ open, onOpenChange }: BillingPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [paymentStage, setPaymentStage] = useState<PaymentStage>("selection");
  const [cardData, setCardData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    saveCard: false,
  });
  const [upiId, setUpiId] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const handleClose = () => {
    setPaymentStage("selection");
    setSelectedMethod("card");
    onOpenChange(false);
  };

  const simulatePayment = (paymentType: string) => {
    setPaymentStage("processing");
    
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      setPaymentStage(isSuccess ? "success" : "failure");
    }, 2500);
  };

  const handlePayWithCard = () => {
    if (!cardData.cardNumber || !cardData.nameOnCard || !cardData.expiry || !cardData.cvc) {
      alert("Please fill in all card details");
      return;
    }
    simulatePayment("card");
  };

  const handlePayWithUPI = () => {
    if (!upiId && !selectedUpiApp) {
      alert("Please enter UPI ID or select a UPI app");
      return;
    }
    simulatePayment("upi");
  };

  const handlePayWithWallet = () => {
    if (!selectedWallet) {
      alert("Please select a wallet");
      return;
    }
    simulatePayment("wallet");
  };

  const handlePayWithNetBanking = () => {
    if (!selectedBank) {
      alert("Please select a bank");
      return;
    }
    simulatePayment("netbanking");
  };

  const upiApps = [
    { 
      id: "gpay", 
      name: "Google Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
    },
    { 
      id: "phonepe", 
      name: "PhonePe", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/PhonePe_Logo.png/512px-PhonePe_Logo.png"
    },
    { 
      id: "paytm", 
      name: "Paytm", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png"
    },
    { 
      id: "bhim", 
      name: "BHIM UPI", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bhim-logo.svg/512px-Bhim-logo.svg.png"
    },
  ];

  const wallets = [
    { 
      id: "paytm", 
      name: "Paytm Wallet", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png"
    },
    { 
      id: "phonepe", 
      name: "PhonePe Wallet", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/PhonePe_Logo.png/512px-PhonePe_Logo.png"
    },
    { 
      id: "amazonpay", 
      name: "Amazon Pay", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Amazon_Pay_logo.svg/512px-Amazon_Pay_logo.svg.png"
    },
    { 
      id: "mobikwik", 
      name: "MobiKwik", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/MobiKwik_Logo.png/512px-MobiKwik_Logo.png"
    },
  ];

  const banks = [
    { 
      id: "sbi", 
      name: "State Bank of India",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/512px-SBI-logo.svg.png"
    },
    { 
      id: "hdfc", 
      name: "HDFC Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/512px-HDFC_Bank_Logo.svg.png"
    },
    { 
      id: "icici", 
      name: "ICICI Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/512px-ICICI_Bank_Logo.svg.png"
    },
    { 
      id: "axis", 
      name: "Axis Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Axis_Bank_logo.svg/512px-Axis_Bank_logo.svg.png"
    },
    { 
      id: "kotak", 
      name: "Kotak Mahindra",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Kotak_Mahindra_Bank_logo.svg/512px-Kotak_Mahindra_Bank_logo.svg.png"
    },
    { 
      id: "pnb", 
      name: "Punjab National",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Punjab_National_Bank_logo.svg/512px-Punjab_National_Bank_logo.svg.png"
    },
  ];

  // Processing Screen
  if (paymentStage === "processing") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="cls-billing-payment-dialog">
          <div className="cls-payment-status-screen">
            <Loader2 className="cls-status-icon cls-processing-icon" size={56} />
            <h2 className="cls-status-title">Processing Payment</h2>
            <p className="cls-status-message">
              Please wait while we process your payment securely...
            </p>
            <div className="cls-processing-details">
              <p>Do not close this window or press back button</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Success Screen
  if (paymentStage === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="cls-billing-payment-dialog">
          <div className="cls-payment-status-screen">
            <CheckCircle2 className="cls-status-icon cls-success-icon" size={56} />
            <h2 className="cls-status-title">Payment Successful!</h2>
            <p className="cls-status-message">
              Your payment method has been updated successfully.
            </p>
            <div className="cls-payment-details">
              <div className="cls-detail-row">
                <span>Transaction ID:</span>
                <span className="cls-detail-value">TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="cls-detail-row">
                <span>Payment Method:</span>
                <span className="cls-detail-value">{selectedMethod.toUpperCase()}</span>
              </div>
            </div>
            <Button onClick={handleClose} className="cls-status-button">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Failure Screen
  if (paymentStage === "failure") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="cls-billing-payment-dialog">
          <div className="cls-payment-status-screen">
            <XCircle className="cls-status-icon cls-failure-icon" size={56} />
            <h2 className="cls-status-title">Payment Failed</h2>
            <p className="cls-status-message">
              We couldn't process your payment. Please try again.
            </p>
            <div className="cls-failure-details">
              <p>Error: Transaction declined by payment gateway</p>
            </div>
            <div className="cls-status-actions">
              <Button onClick={() => setPaymentStage("selection")} className="cls-status-button">
                Try Again
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Selection Screen (Default)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="cls-billing-payment-dialog">
        <DialogHeader>
          <DialogTitle className="cls-dialog-title">
            <CreditCard size={18} />
            Update Payment Method
          </DialogTitle>
          <p className="cls-dialog-subtitle">
            Choose a payment method and enter your details below.
          </p>
        </DialogHeader>

        <div className="cls-payment-content">
          <Accordion
            type="single"
            collapsible
            value={selectedMethod}
            onValueChange={setSelectedMethod}
            className="cls-payment-accordion"
          >
            {/* Card Payment */}
            <AccordionItem value="card" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                <div className="cls-trigger-content">
                  <CreditCard size={16} />
                  <span>Credit / Debit Card</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-card-form">
                  <div className="cls-form-field">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={cardData.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\s/g, '');
                        value = value.match(/.{1,4}/g)?.join(' ') || value;
                        setCardData({ ...cardData, cardNumber: value });
                      }}
                    />
                  </div>

                  <div className="cls-form-field">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="JOHN DOE"
                      value={cardData.nameOnCard}
                      onChange={(e) =>
                        setCardData({ ...cardData, nameOnCard: e.target.value.toUpperCase() })
                      }
                    />
                  </div>

                  <div className="cls-form-row">
                    <div className="cls-form-field">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setCardData({ ...cardData, expiry: value });
                        }}
                      />
                    </div>
                    <div className="cls-form-field">
                      <Label htmlFor="cvc">CVV</Label>
                      <Input
                        id="cvc"
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={cardData.cvc}
                        onChange={(e) =>
                          setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, '') })
                        }
                      />
                    </div>
                  </div>

                  <div className="cls-save-card-option">
                    <Checkbox
                      id="saveCard"
                      checked={cardData.saveCard}
                      onCheckedChange={(checked) =>
                        setCardData({ ...cardData, saveCard: checked as boolean })
                      }
                    />
                    <Label htmlFor="saveCard" className="cls-checkbox-label">
                      Save this card for future payments
                    </Label>
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayWithCard}>
                      Pay Securely
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* UPI Payment */}
            <AccordionItem value="upi" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                <div className="cls-trigger-content">
                  <Smartphone size={16} />
                  <span>UPI</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-upi-form">
                  <div className="cls-form-field">
                    <Label htmlFor="upiId">Enter UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>

                  <div className="cls-divider">
                    <span>OR</span>
                  </div>

                  <div className="cls-upi-apps-section">
                    <Label>Choose UPI App</Label>
                    <div className="cls-upi-apps-grid">
                      {upiApps.map((app) => (
                        <button
                          key={app.id}
                          className={`cls-upi-app-option ${
                            selectedUpiApp === app.id ? "cls-selected" : ""
                          }`}
                          onClick={() => setSelectedUpiApp(app.id)}
                        >
                          <div className="cls-app-logo-container">
                            <img 
                              src={app.logo} 
                              alt={app.name}
                              className="cls-app-logo"
                            />
                          </div>
                          <span className="cls-app-name">{app.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayWithUPI}>
                      Proceed to Pay
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Wallets */}
            <AccordionItem value="wallets" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                <div className="cls-trigger-content">
                  <Wallet size={16} />
                  <span>Wallets</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-wallets-section">
                  <Label>Select a Wallet</Label>
                  <div className="cls-wallets-grid">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        className={`cls-wallet-option ${
                          selectedWallet === wallet.id ? "cls-selected" : ""
                        }`}
                        onClick={() => setSelectedWallet(wallet.id)}
                      >
                        <div className="cls-wallet-logo-container">
                          <img 
                            src={wallet.logo} 
                            alt={wallet.name}
                            className="cls-wallet-logo"
                          />
                        </div>
                        <span className="cls-wallet-name">{wallet.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayWithWallet} disabled={!selectedWallet}>
                      Continue to Wallet
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Net Banking */}
            <AccordionItem value="netbanking" className="cls-accordion-item">
              <AccordionTrigger className="cls-accordion-trigger">
                <div className="cls-trigger-content">
                  <Building2 size={16} />
                  <span>Net Banking</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cls-accordion-content">
                <div className="cls-netbanking-form">
                  <Label>Select Your Bank</Label>
                  <div className="cls-banks-grid">
                    {banks.map((bank) => (
                      <button
                        key={bank.id}
                        className={`cls-bank-option ${
                          selectedBank === bank.id ? "cls-selected" : ""
                        }`}
                        onClick={() => setSelectedBank(bank.id)}
                      >
                        <div className="cls-bank-logo-container">
                          <img 
                            src={bank.logo} 
                            alt={bank.name}
                            className="cls-bank-logo"
                          />
                        </div>
                        <span className="cls-bank-name">{bank.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="cls-form-actions">
                    <Button variant="outline" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handlePayWithNetBanking} disabled={!selectedBank}>
                      Proceed to Bank
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
