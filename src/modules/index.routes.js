import companyRouter from "./company/company.routes.js";
import jopRouter from "./jop/jop.routes.js";
import userRouter from "./user/user.routes.js"


export const bootstrap=(app)=>{
    
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/user',userRouter);
    app.use('/api/v1/company',companyRouter);
    app.use('/api/v1/jop',jopRouter);


    
}