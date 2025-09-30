<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laxmi Temple Donation System</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.js"></script>
</body>
</html>
```

### File 2: `app.js`
```javascript
const { useState } = React;
const Phone = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const Car = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>;
const User = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IndianRupee = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="m6 13 8.5 8"></path><path d="M6 13h3"></path><path d="M9 13c6.667 0 6.667-10 0-10"></path></svg>;
const Send = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>;
const CheckCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><line x1="10" x2="8" y1="9" y2="9"></line></svg>;

function TempleDonationApp() {
  const [formData, setFormData] = useState({
    donorName: '',
    vehicleNumber: '',
    mobileNumber: '',
    amount: ''
  });
  
  const [donations, setDonations] = useState([]);
  const [receiptSent, setReceiptSent] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReceiptNumber = () => {
    return `LT${Date.now().toString().slice(-8)}`;
  };

  const handleSubmit = () => {
    if (!formData.donorName || !formData.vehicleNumber || !formData.mobileNumber || !formData.amount) {
      alert('Please fill all fields');
      return;
    }

    const receiptNumber = generateReceiptNumber();
    const newDonation = {
      ...formData,
      receiptNumber,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN')
    };

    setDonations(prev => [newDonation, ...prev]);
    setCurrentReceipt(newDonation);
    setReceiptSent(true);

    setTimeout(() => {
      setReceiptSent(false);
      setCurrentReceipt(null);
    }, 5000);

    setFormData({
      donorName: '',
      vehicleNumber: '',
      mobileNumber: '',
      amount: ''
    });
  };

  const totalDonations = donations.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-xl p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold text-center mb-2">🪔 Shri Laxmi Temple</h1>
          <p className="text-center text-orange-100">Vehicle Donation Collection System</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Donation Entry
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Donor Name *
                </label>
                <input
                  type="text"
                  value={formData.donorName}
                  onChange={(e) => handleInputChange('donorName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter donor name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-2" />
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value.toUpperCase())}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent uppercase"
                  placeholder="TN01AB1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="9876543210"
                  maxLength="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <IndianRupee className="w-4 h-4 inline mr-2" />
                  Donation Amount (₹) *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="1"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit & Send Receipt
              </button>
            </div>

            {receiptSent && currentReceipt && (
              <div className="mt-4 bg-green-50 border-2 border-green-500 rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <CheckCircle className="w-5 h-5" />
                  Receipt Sent Successfully!
                </div>
                <p className="text-sm text-green-600">
                  SMS sent to {currentReceipt.mobileNumber}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Receipt #: {currentReceipt.receiptNumber}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Today's Collections</h2>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 mb-6">
              <p className="text-sm opacity-90">Total Collected</p>
              <p className="text-3xl font-bold">₹ {totalDonations.toLocaleString('en-IN')}</p>
              <p className="text-sm opacity-90">{donations.length} donations</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {donations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No donations recorded yet</p>
              ) : (
                donations.map((donation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{donation.donorName}</p>
                        <p className="text-sm text-gray-600">{donation.vehicleNumber}</p>
                      </div>
                      <p className="text-lg font-bold text-green-600">₹{donation.amount}</p>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{donation.mobileNumber}</span>
                      <span>{donation.date} {donation.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Receipt: {donation.receiptNumber}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {donations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Sample Receipt SMS</h3>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              <p>🪔 Shri Laxmi Temple</p>
              <p>━━━━━━━━━━━━━━━━</p>
              <p>Receipt: {donations[0].receiptNumber}</p>
              <p>Name: {donations[0].donorName}</p>
              <p>Vehicle: {donations[0].vehicleNumber}</p>
              <p>Amount: ₹{donations[0].amount}</p>
              <p>Date: {donations[0].date}</p>
              <p>━━━━━━━━━━━━━━━━</p>
              <p>Thank you for your donation!</p>
              <p>May Goddess Laxmi bless you 🙏</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<TempleDonationApp />, document.getElementById('root'));
```

## Step 2: Upload to GitHub

### Option A: Using GitHub Website (Easiest)

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Click "Sign up"

2. **Create a New Repository**
   - Click the "+" icon in top right → "New repository"
   - Repository name: `laxmi-temple-donation`
   - Make it **Public**
   - Check "Add a README file"
   - Click "Create repository"

3. **Upload Files**
   - Click "Add file" → "Upload files"
   - Drag and drop your `index.html` and `app.js` files
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" in left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait 1-2 minutes

5. **Access Your Live Site**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/laxmi-temple-donation`

### Option B: Using Git (Command Line)

```bash
# Initialize git in your project folder
cd laxmi-temple-donation
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Laxmi Temple Donation App"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/laxmi-temple-donation.git
git branch -M main
git push -u origin main

# Enable GitHub Pages through Settings → Pages
```

## Step 3: Share Your Live Link

Your application will be live at:
```
https://YOUR-USERNAME.github.io/laxmi-temple-donation
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Troubleshooting

- **Page not showing?** Wait 2-3 minutes after enabling Pages
- **404 Error?** Check that repository is Public and Pages is enabled
- **Files not updating?** Clear browser cache or use Ctrl+Shift+R

## Notes

- The app stores data in browser memory only (data resets on page refresh)
- For permanent storage, you'll need to add a backend database
- SMS sending is simulated - to send real SMS, integrate with services like Twilio, MSG91, or Fast2SMS
