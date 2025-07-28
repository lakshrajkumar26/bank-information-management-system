# Proper Validation for 

Field	Validation Rules	Zod 
IFSC Code	Exactly 11 characters, format: 4 letters + 0 + 6 digits	/^[A-Z]{4}0[A-Z0-9]{6}$/
Branch Name	Required, only letters + spaces allowed	/^[a-zA-Z\s]{3,}$/
Bank Name	Required, only letters + spaces, 3+ characters	/^[a-zA-Z\s]{3,}$/
Account Number	Usually 9–18 digits (varies by bank) — min 9, max 18	/^\d{9,18}$/
Account Holder’s Name	Required, only letters and spaces	/^[a-zA-Z\s]{3,}$/
