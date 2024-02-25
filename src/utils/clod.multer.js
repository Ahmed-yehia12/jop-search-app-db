import multer , {diskStorage} from 'multer'; 





export function uploadFileCloud(file,filter){
    const storage = diskStorage({});



 const multerUp = multer({storage });
 return multerUp
}


