import {fileTypeFromFile} from 'file-type';
// Installation de file-type et l'importer

const checkAcceptedExtensions = async (file, acceptedExtensions) => {
    // Vérification du ficher, s'il ne correspond pas, celui ci est undedfined
    const fileType = await fileTypeFromFile(file.filepath)
    
    // si le fileType est undefined le fichier n'est pas valide 
    // Sinon on vérifie si l'extension est dans notre array accepted
    if(!fileType) {
        return false
    } else {
        if(acceptedExtensions.includes(fileType.ext)) {
            return true
        }
        return false
    }
}

export default checkAcceptedExtensions;