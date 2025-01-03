-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: bookclub
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_genres`
--

DROP TABLE IF EXISTS `book_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_genres` (
  `book_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_genres_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `book_genres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_genres`
--

LOCK TABLES `book_genres` WRITE;
/*!40000 ALTER TABLE `book_genres` DISABLE KEYS */;
INSERT INTO `book_genres` VALUES (42,2),(41,3),(43,3),(44,3),(45,3),(46,3),(47,3),(48,3),(49,3),(50,3),(43,4),(45,4),(46,6),(47,7),(50,7),(48,8),(61,8),(42,9),(49,10),(49,11),(41,12),(50,12),(50,13),(50,14),(53,23);
/*!40000 ALTER TABLE `book_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booklink`
--

DROP TABLE IF EXISTS `booklink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booklink` (
  `linkID` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `nomeLink` text NOT NULL,
  `link` text NOT NULL,
  PRIMARY KEY (`linkID`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `booklink_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booklink`
--

LOCK TABLES `booklink` WRITE;
/*!40000 ALTER TABLE `booklink` DISABLE KEYS */;
INSERT INTO `booklink` VALUES (8,41,'Amazon','https://amzn.eu/d/hziRNy3'),(9,41,'Feltrinelli','https://www.lafeltrinelli.it/storia-tra-due-citta-ebook-charles-dickens/e/9788852023002?queryId=cc4a326bcbca1ef9349410025ad693b6'),(10,41,'Mondadori','https://www.mondadoristore.it/Una-storia-tra-due-citta-Charles-Dickens/eai978885202300/'),(11,42,'Amazon','https://amzn.eu/d/hUZqObG'),(12,42,'Feltrinelli','https://www.lafeltrinelli.it/piccolo-principe-libro-antoine-de-saint-exupery/e/9788854172388?queryId=126b3817932789b6fdb63880cf69bf96'),(13,42,'Mondadori','https://www.mondadoristore.it/Il-Piccolo-Principe-Antoine-de-Saint-Exupery/eai978880621322/'),(14,43,'Amazon','https://amzn.eu/d/54gbY0y'),(15,43,'Feltrinelli','https://www.lafeltrinelli.it/compagnia-dell-anello-signore-degli-libro-john-r-r-tolkien/e/9788830105263?queryId=4e3b87fb7f3f853c9844d2bd8568c848'),(16,43,'Mondadori','https://www.mondadoristore.it/compagnia-dell-anello-John-Ronald-Reuel-Tolkien/eai978883010526/'),(17,44,'Amazon','https://amzn.eu/d/epC5Mx1'),(18,44,'Feltrinelli','https://www.lafeltrinelli.it/alchimista-libro-paulo-coelho/e/9788893443029?queryId=5a246942ef2a6aa326f65737a95d05b3'),(19,44,'Mondadori','https://www.mondadoristore.it/L-alchimista-Paulo-Coelho/eai978889344302/'),(20,45,'Amazon','https://amzn.eu/d/5FUArAY'),(21,45,'Feltrinelli','https://www.lafeltrinelli.it/harry-potter-pietra-filosofale-nuova-libro-j-k-rowling/e/9788831003384?queryId=8b8cba94a90258ff63425dbf42e70faf'),(22,45,'Mondadori','https://www.mondadoristore.it/Harry-Potter-pietra-J-K-Rowling/eai978883100338/'),(23,46,'Amazon','https://amzn.eu/d/6dKykYy'),(24,46,'Feltrinelli','https://www.lafeltrinelli.it/avventure-di-alice-nel-paese-libro-lewis-carroll/e/9788834616598?queryId=75b7774502524b8edbc82ad828ee7efc'),(25,46,'Mondadori','https://www.mondadoristore.it/avventure-Alice-Paese-Lewis-Carroll/eai978883461659/'),(26,47,'Amazon','https://amzn.eu/d/3GDPTyW'),(27,47,'Feltrinelli','https://www.lafeltrinelli.it/dieci-piccoli-indiani-non-rimase-libro-agatha-christie/e/9788804728689?queryId=72663e491857d0a44f06441f13c088f1'),(28,47,'Mondadori','https://www.mondadoristore.it/Dieci-piccoli-indiani-non-Agatha-Christie/eai978880472868/'),(29,48,'Amazon','https://amzn.eu/d/1Eh85CR'),(30,48,'Feltrinelli','https://www.lafeltrinelli.it/codice-da-vinci-libro-dan-brown/e/9788804746676?queryId=234477e31294fcc203b22e59e4869ac5'),(31,48,'Mondadori','https://www.mondadoristore.it/Il-Codice-da-Vinci-Dan-Brown/eai978880474667/'),(32,49,'Amazon','https://amzn.eu/d/0Mm80SI'),(33,49,'Feltrinelli','https://www.lafeltrinelli.it/ponti-di-madison-county-libro-robert-j-waller/e/9788868365684?queryId=e3486f9b428264b2881968d781def905'),(34,49,'Mondadori','https://www.mondadoristore.it/I-ponti-di-Madison-County-Robert-James-Waller/eai978886836568/'),(35,50,'Amazon','https://amzn.eu/d/bLjT4XQ'),(36,50,'Feltrinelli','https://www.lafeltrinelli.it/nome-della-rosa-ediz-illustrata-libro-umberto-eco/e/9788834603000?queryId=7e4c08375bfe4e5482a1483ce5d5af19'),(37,50,'Mondadori','https://www.mondadoristore.it/nome-rosa-Ediz-illustrata-Umberto-Eco/eai978883460300/'),(39,53,'Amazon','https://www.amazon.it/Programmazione-learning-sicurezza-informatica-algoritmi/dp/B0CN8VSDVW/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=CG8AMOH0YJLV&dib=eyJ2IjoiMSJ9.Gx7tlUXxkqQJ1wpdWKy8LLkVKG2gPvyUcfsjcI9ANPoL6xrjWKoU-haFr0DhSFWJCm6ue7gJvSgYMBfXIpSYViArscCs_ONoh2tqgAO9GX5LESA_1EaDyfbv9cMTHvH_K9zEFEmZo-xW8hYoJm_gJYuduKb0wSWOs9TxLN8Q39A.dml1jnNP1HnYuOyhgFafI5r5egr_1LQEbsHGr36HhB8&dib_tag=se&keywords=tony+chan+python&nsdOptOutParam=true&qid=1734435180&sprefix=tony+chan+python%2Caps%2C102&sr=8-1#detailBullets_feature_div'),(42,61,'Amazon','https://www.amazon.it/1Q84-Libro-1-2-Aprile-settembre/dp/8806226223/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=IKKDL8LJB7S8&dib=eyJ2IjoiMSJ9.OAYL48tN9ppQ-rZpx4_5M499PwN10O9X2uxuYavrBnaQ_P7o2fn-8AIxSCSxa4Nf-iNMv_rJWXPdKNjtGrPslLJBVZWiMixHUaeHP0c3qShaRORZxMg5570w7l7H1cFDxe5bR_veHEjTs5icitm6ienfURltIn_w9Eic6pm-zB9XkIcOET8QFL2vkeRO8oCUOK8jCYs56UdB8uVL-9v5oeBfDg7eUIHIVAq0lYHMwSGU6vjbTYDcZDvg5fsTG0c-ZkVzso3F_5yBhY9eJqnVNi29WniYJupTsmf6T-HG6_ouqO_SVxSmALY2fYc6LUwFjj4cFP59oTvtQv_dEgrIummStFJ_TWHvwYj73kzfWfGw4cP3WK1FAM1Vew-uoEFt2LcBO7PhLMtE89eNh718_OJ8JVlmwW0ssImerlWsm_xj-1aMy1XMkxaXS75Bux4h.f91qRnr2-K51Hrq5asVspEGTCJMBmqmBg9VlvxH7PX8&dib_tag=se&keywords=1Q84+murakami&nsdOptOutParam=true&qid=1735902677&sprefix=1q84+murakami%2Caps%2C116&sr=8-1');
/*!40000 ALTER TABLE `booklink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titolo` varchar(255) NOT NULL,
  `autore` varchar(255) NOT NULL,
  `descrizione` text,
  `data_pubblicazione` date DEFAULT NULL,
  `creato_il` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isApproved` tinyint(1) DEFAULT '0',
  `imagePath` text,
  `Aggiunto_Da` text,
  `clicked` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (41,'Una storia tra due città','Charles Dickens','Romanzo di enorme e duraturo successo, Una storia tra due città uscì dapprima a puntate, quindi in volume, nel 1859. Si tratta di un romanzo storico ambientato tra Parigi e Londra nei burrascosi anni che precedettero e seguirono la Rivoluzione francese. Tra le molteplici vicende umane che si intrecciano in queste pagine spiccano quelle di Lucie Manette, donna insieme dolce e coraggiosa, figlia di un uomo ingiustamente detenuto nella Bastiglia e da lei inizialmente creduto morto; di Charles Darnay, aristocratico francese espatriato in Inghilterra, indiscriminatamente accusato durante il Terrore; e infine dell\'avvocato Sydney Carton, dall\'ambiguo passato, cui viene offerto un inconsueto destino. Racconto avvincente e ricco di colpi di scena, Una storia tra due città vive anche di un raffinato impianto allegorico nel quale i luoghi e i personaggi rappresentano diverse istanze politiche e sociali, in una indimenticabile raffigurazione delle forze che muovono la Storia dell\'uomo.','2018-07-24','2024-12-15 21:29:29',1,'uploads/Una storia tra due città.jpg','1',59),(42,'Il piccolo principe','Antoine de Saint-Exupéry','Il Piccolo Principe è la storia dell’incontro in mezzo al deserto tra un aviatore e un buffo ometto vestito da principe che è arrivato sulla Terra dallo spazio. Ma c’è molto di più di una semplice amicizia in questo libro surreale, filosofico e magico. C’è la saggezza di chi guarda le cose con occhi puri, la voce dei sentimenti che parla la lingua universale, e una sincera e naturale voglia di autenticità. Perché la bellezza, quando non è filtrata dai pregiudizi, riesce ad arrivare fino al cuore dei bambini, ma anche a quello degli adulti che hanno perso la capacità di ascoltare davvero.','2015-01-08','2024-12-15 21:57:45',1,'uploads/Il piccolo principe.jpg','1',16),(43,'La Compagnia dell\'Anello','John Ronald Reuel Tolkien','La Compagnia dell\'Anello si apre nella Contea, un idilliaco paese agricolo dove vivono gli Hobbit, piccoli esseri lieti, saggi e longevi. La quiete è turbata dall\'arrivo dello stregone Gandalf, che convince Frodo a partire per il paese delle tenebre, Mordor, dove dovrà gettare nelle fiamme del Monte Fato il terribile Anello del Potere, giunto nelle sue mani per una serie di incredibili circostanze. Un gruppo di hobbit lo accompagna e strada facendo si aggiungono alla banda l\'elfo, il nano e alcuni uomini, tutti uniti nella lotta contro il Male. La Compagnia affronta un cammino lungo e pericoloso, finché i suoi membri si disperdono, minacciati da forze oscure, mentre la meta sembra allontanarsi sempre di più.','2021-07-01','2024-12-15 21:59:15',1,'uploads/La Compagnia dell\'Anello.jpg','1',7),(44,'L\'alchimista','Paulo Coelho','L\'alchimista” è la storia di una iniziazione. Ne è protagonista Santiago, un giovane pastorello andaluso il quale, alla ricerca di un tesoro sognato, intraprende quel viaggio avventuroso, insieme reale e simbolico, che al di là dello stretto di Gibilterra e attraverso tutto il deserto nordafricano lo porterà fino all\'Egitto delle piramidi. E sarà proprio durante il viaggio che il giovane, grazie all\'incontro con il vecchio alchimista, salirà tutti i gradini della scala sapienziale: nella sua progressione sulla sabbia del deserto e, insieme, nella conoscenza di sé, scoprirà l\'anima del mondo, l\'amore e il linguaggio universale, imparerà a parlare al sole e al vento e infine compirà la sua leggenda personale. Il miraggio, qui, non è più solo la mitica pietra filosofale dell\'alchimia, ma il raggiungimento di una concordanza totale con il mondo, grazie alla comprensione di quei \"segni\", di quei segreti che è possibile captare solo riscoprendo un linguaggio universale fatto di coraggio, di fiducia e di saggezza che da tempo gli uomini hanno dimenticato.','2017-07-20','2024-12-15 22:06:11',1,'uploads/L\'alchimista.jpg','1',6),(45,'Harry Potter e la pietra filosofale','Joanne Rowling','Girando la busta con mano tremante, Harry vide un sigillo di ceralacca color porpora con uno stemma araldico: un leone, un\'aquila, un tasso e un serpente intorno a una grossa H». Tutto comincia da qui. Il primo capitolo di uno dei più grandi fenomeni letterari internazionali, il libro che ha fatto leggere milioni di ragazzi e ha unito genitori e figli nella scoperta di un universo fantastico che è già parte dell\'immaginario collettivo. Edizione speciale con contenuti inediti: la mappa di Hogwarts, il glossario, curiosità sui fondatori di Hogwarts.','2020-01-23','2024-12-15 22:07:25',1,'uploads/Harry Potter e la pietra filosofale.jpg','1',4),(46,'Le avventure di Alice nel Paese delle Meraviglie','Lewis Carroll','Chi volesse inseguire sul prato un coniglio col panciotto che corre frettoloso guardando il suo orologio da taschino, come sceglie di fare Alice in un tranquillo pomeriggio di sole, dovrebbe quantomeno aspettarsi qualche sorpresa. Come finire sottoterra in un mondo dove non valgono più le regole a cui siamo abituati. E qui diventare, all’occorrenza, grandi come una casa o alti trenta centimetri. O, ancora, giocare a croquet con un fenicottero come mazza e ballare la quadriglia con le aragoste, guardarsi dalle cattive compagnie e tenersi alla larga dalla Regina di Cuori, e dalla sua passione per mozzare le teste altrui. La storia di Alice – una ragazzina curiosa che attraversa la porta di un mondo fantastico e svela con il suo sguardo le follie degli adulti – ha conquistato i lettori di ogni età e di ogni epoca con i suoi paradossi e le invenzioni del suo autore.','2023-12-15','2024-12-15 22:09:51',1,'uploads/Le avventure di Alice nel Paese delle Meraviglie.jpg','1',6),(47,'Dieci piccoli indiani','Agatha Christie','Una casa misteriosa su un\'isola deserta, lontana dal resto del mondo. Dieci persone che non si sono mai incontrate prima, accomunate solo dal fatto di avere tutte un inquietante passato e riunite da una serie inspiegabile di inviti. Un ospite misterioso che non si fa mai vedere. E un\'assurda filastrocca per bambini che ritorna ossessivamente, scandendo implacabile una successione di omicidi. Dieci piccoli indiani (1939) è il capolavoro di Agatha Christie e una delle vette del romanzo di suspense.','2020-04-20','2024-12-15 22:12:55',1,'uploads/Dieci Piccoli Indiani.jpg','1',2),(48,'Il codice da Vinci','Dan Brown','In una tranquilla notte parigina, nella Grande Galleria del Louvre, l\'anziano curatore Saunière viene ferito a morte da un misterioso rapinatore, costretto a fuggire senza la sua preda. Con le sue ultime forze lo storico dell\'arte scrive alcuni numeri, poche parole e un nome: Robert Langdon, celebre studioso di simbologia. Sarà proprio lui a capire che con il suo messaggio oscuro Saunière lo ha costretto a giocare a distanza di secoli, e a rischio della propria vita, contro il genio stesso di Leonardo da Vinci. La scoperta è sconvolgente: il grande pittore rinascimentale proteggeva un distruttivo codice segreto. Con gli enigmi nascosti nei suoi dipinti, con i suoi ingegnosi marchingegni e con la spaventosa forza di una setta segreta che da secoli ha sempre tentato di trasformare la storia dell\'umanità. Chi era davvero Leonardo? Cosa nascondevano i Templari? Quale chiave dà accesso al segreto del Santo Graal?','2022-01-12','2024-12-15 22:15:08',1,'uploads/Il codice da Vinci.jpg','1',0),(49,'I ponti di Madison County','Robert James Waller','I ponti di Madison County\" è la storia di Robert Kincaid, fotografo di fama, e Francesca Johnson, moglie di un agricoltore. Kincaid, singolare, quasi mistico viaggiatore dei deserti asiatici, di fiumi lontani, di antiche città, è un uomo che quasi non appartiene al suo tempo. Francesca Johnson, un\'italiana giunta in America come sposa di guerra, vive tra le colline dello Iowa meridionale e, di tanto in tanto, torna col pensiero ai suoi sogni di ragazza. Nessuno dei due ha mai cercato qualcosa di diverso da ciò che ha, ma quando Robert, in viaggio per un servizio, entra nel cortile di lei per chiedere un\'informazione, il ritmo delle loro esistenze si spezza sotto la forza di un\'emozione inesprimibile. L\'incontro tra Robert e Francesca diventa rapidamente un legame profondo e ciò che accade durante pochi giorni di una torrida estate, presso i vecchi ponti coperti di Madison County, è per entrambi un\'esperienza così intensa da trasfigurare i luoghi consueti e i gesti quotidiani. I momenti trascorsi insieme diventano un patrimonio raro e prezioso di sentimenti a cui attingere per il resto della vita e che sopravviverà a loro stessi.','2019-10-08','2024-12-15 22:16:32',1,'uploads/I ponti di Madison County.jpg','1',1),(50,'Il nome della rosa','Umberto Eco','Un’abbazia medievale isolata. Una comunità di monaci sconvolta da una serie di delitti. Un frate francescano che indaga i misteri di una biblioteca inaccessibile.','2020-05-21','2024-12-15 22:17:53',1,'uploads/Il nome della rosa.jpg','1',1),(53,'Python','Tony Chan','- Cerchi un testo completo, aggiornato e accessibile su Python e i suoi principali campi di utilizzo?\r\n- Desideri l’unica monumentale opera dedicata a questo argomento presente sul mercato?\r\n- Stai cercando una raccolta composta da libri reali e di buona qualità?\r\n- Vuoi prepararti in tempo per le sfide del futuro?\r\n- Sei un principiante, ma vuoi lavorare rapidamente con listati di apprendimento automatico, deep learning, reti neurali e IA?\r\n- Ti incuriosisce studiare Python con un approccio interdisciplinare, come in varie università americane (Stanford, Harvard)?\r\n- Vorresti a supporto più di 600 esempi dimostrativi e oltre 580 esercizi con soluzioni?','2023-11-13','2024-12-17 11:35:51',1,'uploads/python.jpg','1',7),(61,'1Q84. Libro 1 e 2. Aprile-settembre',' Haruki Murakami','1984, Tokyo. Aomame è bloccata in un taxi nel traffico. L\'autista le suggerisce, come unica soluzione per non mancare all\'appuntamento che l\'aspetta, di uscire dalla tangenziale utilizzando una scala di emergenza, nascosta e poco frequentata. Ma, sibillino, aggiunge di fare attenzione: \"Non si lasci ingannare dalle apparenze. La realtà è sempre una sola\". Negli stessi giorni Tengo, un giovane aspirante scrittore dotato di buona tecnica ma povero d\'ispirazione, riceve uno strano incarico: un editor senza scrupoli gli chiede di riscrivere il romanzo di un\'enigmatica diciassettenne così da candidarlo a un premio letterario. Ma \"La crisalide d\'aria\" è un romanzo fantastico tanto ricco di immaginazione quanto sottilmente inquietante: la descrizione della realtà parallela alla nostra e di piccole creature che si nascondono nel corpo umano come parassiti turbano profondamente Tengo. L\'incontro con l\'autrice non farà che aumentare la sua vertigine: chi è veramente Fukada Eriko? Intanto Aomame (che pure non è certo una ragazza qualsiasi: nella borsetta ha un affilatissimo rompighiaccio con cui deve uccidere un uomo) osserva perplessa il mondo che la circonda: sembra quello di sempre, eppure piccoli, sinistri particolari divergono da quello a cui era abituata. Finché un giorno non vede comparire in cielo una seconda luna e sospetta di essere l\'unica persona in grado di attraversare la sottile barriera che divide il 1984 dal 1Q84. Ma capisce anche un\'altra cosa: che quella barriera sta per infrangersi.','2015-05-05','2025-01-03 13:17:26',1,'uploads/61NhxAwS42L._SY522_.jpg','13',2);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commenti`
--

DROP TABLE IF EXISTS `commenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commenti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `contenuto` text NOT NULL,
  `creato_il` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `commenti_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commenti_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commenti`
--

LOCK TABLES `commenti` WRITE;
/*!40000 ALTER TABLE `commenti` DISABLE KEYS */;
INSERT INTO `commenti` VALUES (14,1,53,'LIBRO FANTASTICO','2024-12-17 11:36:32'),(15,10,53,'Libro Incredibile','2024-12-17 12:08:00'),(17,1,41,'CIAO','2025-01-03 11:44:48'),(18,1,61,'CIAO','2025-01-03 13:18:20');
/*!40000 ALTER TABLE `commenti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genre_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Horror'),(2,'Letteratura'),(3,'Romanzo'),(4,'Fantasy'),(5,'Romanzo di formazione'),(6,'Fantastico'),(7,'Giallo'),(8,'Thriller'),(9,'Racconto'),(10,'Drammatico'),(11,'Sentimentale'),(12,'Storico'),(13,'Gotico'),(14,'Filosofico'),(15,'Fantascienza'),(16,'Politica'),(17,'Economia'),(18,'Diritto'),(19,'Biografia'),(20,'Casa'),(21,'Arte'),(22,'Poetico'),(23,'Educazione'),(24,'Viaggi'),(25,'Psicologia'),(26,'Religione'),(27,'Salute e Benessere'),(28,'Scienza'),(29,'Sport');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `e_admin` tinyint(1) DEFAULT '0',
  `creato_il` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Preferenze` varchar(1000) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nicola','Nhikoh@gmail.com','1234',1,'2024-12-06 16:35:44','Racconto'),(10,'Raffaele','raffaeleverolla@gmail.com','123',0,'2024-12-07 18:52:46',''),(12,'asd','ciao@gmail.com','123',0,'2024-12-13 11:17:29',''),(13,'antonio Parallels','antonioparallels@parallels.it','123',0,'2025-01-03 11:05:46','Romanzo');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 14:39:27
