/**
 * Validates email addresses against known NHS email domains.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 * @since 1.0.0
 */
exports.validateEmailAddress = (req, res) => {
	
	// Get the email address from the body of the HTTP request.
	// If an email address was not specified, set the value to be an empty string.
	let email_address = req.body.email_address || '';
	
	// Check if the email address (string) ends in @nhs.net or .nhs.uk.
	if( email_address.endsWith('@nhs.net') || 
	    email_address.endsWith('.nhs.uk') ) {
		
		// The domain of the email address specified matches a domain known to be used by those working in the NHS.
		// We can say therefore with some level of certainty, as the user has verified this email address, that the user creating an account is likely to have some affiliation to the NHS.
		// Allow the sign up to continue.
		res.status(200).send('{"version": "1.0.0", "status": 200}');
		
	}
	
	// The domain of the email address specified does not match a domain known to be used by those working in the NHS.
	// Or the email address provided by Microsoft Azure AD B2C is malformed.
	// Either way we cannot say with a level of certainty, that the user signing up works in the NHS. The default therefore is to deny access to the system for security.
	res.status(409).send('{"version": "1.0.0", "status": 409, "userMessage": "You cannot sign up with this email address. If you believe this is a mistake, please contact us."}');

};
