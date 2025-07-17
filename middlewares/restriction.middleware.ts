

export const restrictTo = (...args:String[]) =>{
    return (req: any, res: any, next: any) =>{
        try{
            const user =req.user;
        if(args.includes(user?.role)){
            return next();
        }else{
            return res.status(401).json({error: "Access Denied"})
        }
        }catch(err:any){
            return res.status(500).json({error: err.message});
        }
    }
}