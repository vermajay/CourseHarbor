exports.contactMail = (data) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Message from User</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://courseharbor.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="CourseHarbor Logo"></a>
            <div class="message">Message from User</div>
            <div class="body">
                <p>First Name: ${data?.firstname}</p>
                <p>Last Name: ${data?.lastname}</p>
                <p>Email: ${data?.email}</p>
                <p>Message: ${data?.message}</p>
                <p>Phone No: ${data?.phoneNo}</p>
                <p>Country Code: ${data?.countrycode}</p>
            </div>
        </div>
    </body>
    
    </html>`;
};