" use strict ";

import { sessionManager } from "../utils/session.JS";

const validateUpload = {
    validateUpload: function ( formData ) {
        let errors = [];

        let title = formData.get ("title") ;
        let url = formData.get ("url") ;
        let desc=formData.get("description");
        
        let maltitle=validateUpload.validateWords(title);
        if(maltitle>0){
            errors.push("The there are non-correct words in the title");
        }

        let maldescription=validateUpload.validateWords(desc);
        if(maldescription>0){
            errors.push("The there are non-correct words in the description");
        }

        if (title.length<1){
            errors.push("Title is too short");
        }
        if (url.length<5){
            errors.push("Invalid URL");
        }
        if(!sessionManager.isLogged()){
            errors.push("You must be an user to upload photos");
        }
        return errors;
    },

    validateWords: function(text){
        let errors=0;
        let lista=['Abuso','Acojonar','Afollonada','Afollonado','Agilipollada','Agilipollado','Agilipollar','Alamierda','Amamonada','Amamonado','Amargada','Amargado','Anárquico','Anormal','Asesina','Asesinar','Asesino','Asquerosa','Asqueroso','Autoritaria','Autoritario','Autoritarismo','Badajo','Bastarda','Bastardo','Basura','Berzas','Berzotas','Bestia','Boba','Bobo','Bollera','Boluda','Boludez','Boludo','Borracha','Borrachaza','Borrachazo','Borrachera','Borracho','Borrachuza','Borrachuzo','Bronca','Bufón','Bufona','Bujarra','Bujarrilla','Bujarrón','Cabreada','Cabreado','Cabrear','Cabreo','Cabrón','Cabrona','Cabronada','Cabroncete','Caca','Cachonda','Cachondeo','Cachondo','Cagada','Cagado','Cagar','Cagarla','Cagarse','Cagoen','Cagón','Cagona','Calentorra','Calentorro','Calzonazo','Calzonazos','Camero','(Celadores)','Capulla','Capullo','Carajo','Carajota','Carajote','Carallo','Carnudo','Cascar','Cascarla','Casquete','Cateta','Cateto','Cazurra','Cazurro','Cencular','Cenutrio','Cepillar','Ceporra','Ceporro','Chapero','Chaquetera','Chaquetero','Chichi','Chingada','Chingar','Chivata','Chivato','Chocho','Chochona','Choriza','Chorizo','Chorra','Chorrada','Chorva','Chula','Chulilla','Chulillo','Chulita','Chulito','Chulo','Chuloputas','Chumino','Chúpame','Chúpamela','Chupópteros','Churra','Churrita','Chutarse','Chute','Cipote','Cipotón','Cojón','Cojones','Cojonudo','Comemierda','Comino','Coño','Cornuda','Cornudo','Correrse','Corrida','Corrupta','Corrupto','Cretina','Cretino','Cuerno','Cuesco','Culear','Culero','Cutre','Decapitar','Decojones','Degollar','Descojonarse','Descojone','Descojono','Desequilibrada','Desequilibrado','Desgraciada','Desgraciado','Déspota','Dictatorial','Doctorcilla','Doctorcillo','Doctorcita','Doctorcito','Drogata','Embustera','Embustero','Encabronar','Encubrimiento','Encular','Enganchada','Enganchado','Engañabobos','Engañar','Engaño','Enmascaramient o','Enmascarar','Envenenar','Escocida','Escocido','Estafa','Estafador','Estafadora','Estúpida','Estúpido','Facha','Falo','Farsante','Folla','Follada','Follado','Follador','Folladora','Follamos','Follando','Follar','Follarse','Follo','Follón','Follones','Friki','Frustrada','Frustrado','Fulana','Fulanita','Fulanito','Fulano','Furcia','Gallorda','Gamberra','Gamberro','Gañán','Gili','Gilipolla','Gilipollas','Gilipuertas','Gitaneo','Granuja','Greñudo','Guarra','Guarrita','Guarrito','Guarro','Guay','Hijadeputa','Hijaputa','Hijodeputa','Hijoputa','Hipócrita','Hostia','Huevo','Huevón','Huevona','Idiota','Ignorante','Imbécil','Impresentable.','Jiñar','Jiñarse','Joder','Joderos','Jódete','Jodida','Jodido','Jodienda','Joputa','Ladrón','Ladrona','Lameculo','Litrona','Loca','Loco','Loquera','Loquero','Machacarla','Machorra','Mafia','Mafiosa','Mafioso','Majadera','Majadero','Malafolla','Malfolla','Malfollada','Malfollado','Malnacida','Malnacido','Malparida','Malparido','Mamada','Mámamela','Mamarla','Mamarracha','Mamarracho','Mameluco','Mamón','Mamona','Mamporrero','Mangante','Marica','Maricón','Maricona','Mariconazo','Marimacha','Marimacho','Mariposón','Masacre','Matanza','Matar','Matasanos','Mato','Matón','Mear','Mecorro','Medicucha','Medicucho','Mediquilla','Mediquillo','Mejiño','Melapelan','Memeo','Mentecata','Mentecato','Mentirosa','Mentiroso','Mierda','Minga','Miserable','Mocosa','Mocoso','Mogollón','Mojigata','Mojigato','Mojino','Mojón','Moña','Morralla','Mugra','Mugriente','Mugrosa','Mugroso','Nabo','Nalgas','Negligencia','Negligente','Negrata','Negrera','Negrero','Opresor','Opresora','Paja','Pajera','Pajero','Pajillera','Pajillero','Palurda','Palurdo','Pamplina','Panoli','Papanatas','Pasota','Payasa','Payaso','Pécora','Pedo','Pedorra','Pedorro','Pelandrusca','Pelandrusco','Pendeja','Pendejo','Peo','Perraso','Perversa','Perverso','Pesetera','Pesetero','Peta','Petarda','Petardo','Picha','Pichafloja','Pija','Pijar','Pijo','Pijotera','Pijotero','Pilila','Pinga','Piojosa','Piojoso','Pipote','Pirada','Pirado','Polla','Pollada','Pollón','Porcojones','Porculo','Porelculo','Porrera','Porrero','Porro','Pringada','Pringado','Proxeneta','Puerca','Puerco','Puñeta','Puñetera','Puñetero','Puta','Putada','Putero','Putilla','Putillo','Putita','Putito','Puto','Putón','Putona','Queosjodan','Querella','Rabo','Ramera','Ramero','Ratera','Ratero','Reinona','Reputa','Roña','Roñosa','Roñoso','Sabandija','Sangráis','Sangrantes','Sarasa','Sarna','Sarnosa','Sarnoso','Sinvergüenza','Soplaflautas','Soplapollas','Subidón','Subnormal','Sudaca','Tarada','Tarado','Taruga','Tarugo','Teta','Tete','Tocacojones','Tocapelotas','Tonta','Tonto','Torpe','Tortillera','Toto','Tragapollas','Tragasables','Trapicheo','Truño','Tusmuertos','Usurera','Usurero','Vividor','Vividora','Yoya','Zangana','Zangano','Zopenca','Zopenco','Zorra','Zorrilla','Zorro','Zorrón','Zorrona','Zurullo'];
        for(let e of lista){
            if(text.toLowerCase().includes(e.toLowerCase())){
                errors=errors+1;
            }
        }

        return errors;
    }
};
export {validateUpload};