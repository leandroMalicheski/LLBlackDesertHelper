import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImperialItem } from '../classes/imperialItem';
import { Meal } from '../classes/meal';
import { Ingredient } from '../classes/ingredients';
import { UtilsProvider } from '../providers/utils/utils';
import { Boss } from '../classes/boss';
import { TabsPage } from '../pages/tabs/tabs';
import { BossProvider } from '../providers/boss/boss';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public bossProvider: BossProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      if(localStorage.getItem('isFirstTime') == undefined){
        this.createImperialCooking();
        this.createMeals();
        this.createIngredients();
        this.generateWorldBosses();
        localStorage.setItem('isFirstTime', JSON.stringify(false)); 
      }
      
      splashScreen.hide();
    });
  }

  generateWorldBosses(){
    let bosses = [
      new Boss("Kzarka","Santuário de Serendia","assets/imgs/worldBoss/kzarka.png"),
      new Boss("Kutum","Câmara de Pedra Scarlate","assets/imgs/worldBoss/kutum.png"),
      new Boss("Nouver","Santuário do Peregrino","assets/imgs/worldBoss/nouver.png"),
      new Boss("Karanda","Cume Karanda","assets/imgs/worldBoss/karanda.png")
    ];
    
    localStorage.setItem('bosses', JSON.stringify(bosses));   
  }
  createMeals(){
    let mealList = [
      new Meal ("0","Cerveja", undefined,UtilsProvider.APRENDIZ+" 1",UtilsProvider.MEAL_IMG_PATH + "beer.png",[{name:"Cerveja Gelada"}],[{id:"0",qty:5},{id:"1",qty:6},{id:"2",qty:1},{id:"6",qty:2}]),
      new Meal ("1","Ração Orgânica",undefined,UtilsProvider.APRENDIZ+ " 6",UtilsProvider.MEAL_IMG_PATH + "organicFeed.png", undefined,[{id:"3",qty:2},{id:"4",qty:5},{id:"7",qty:4},{id:"5",qty:4}]),
      new Meal ("2","Ovos de Pássaro Cozido",[{name:"Ataque Total +1"}], UtilsProvider.INICIANTE+ " 6", UtilsProvider.MEAL_IMG_PATH + "boiledEgg.png", [{name:"Ovo Cozido Atraente"}],[{id:"14",qty:3},{id:"1",qty:6},{id:"12",qty:1},{id:"13",qty:1}]),
      new Meal ("3","Aveia",undefined,UtilsProvider.APRENDIZ+ " 1",UtilsProvider.MEAL_IMG_PATH + "oatmeal.png", [{name:"Aveia Refinada"}],[{id:"8",qty:9},{id:"9",qty:3},{id:"10",qty:3},{id:"11",qty:2}]),
      new Meal ("4","Peixe Frito",[{name:"Velocidade de Movimento +1"}],UtilsProvider.INICIANTE+ " 1", UtilsProvider.MEAL_IMG_PATH + "friedFish.png", [{name:"Peixe Frito Crocante"}],[{id:"8",qty:3},{id:"5",qty:2},{id:"15",qty:2}]),
      new Meal ("5","Salgado de File de Peixe",undefined, UtilsProvider.APRENDIZ+ " 1", UtilsProvider.MEAL_IMG_PATH + "fishFilletChips.png", [{name:"Salgado de File de Peixe Delicioso"}],[{id:"5",qty:2},{id:"16",qty:3},{id:"8",qty:7},{id:"13",qty:2}]),
      new Meal ("6","Ensopado de Carne",[{name:"+30 HP Máx. por 30 min"}],UtilsProvider.INICIANTE+ " 6", UtilsProvider.MEAL_IMG_PATH + "meatStew.png", [{name:"Ensopado de Carne Forte"}], [{id:"4",qty:5},{id:"8",qty:2},{id:"12",qty:2},{id:"1",qty:3}]),
      new Meal ("7","Omelete",[{name:"Redução de todo dano recebido +2"}],UtilsProvider.APRENDIZ+ "1",UtilsProvider.MEAL_IMG_PATH + "omelete.png", [{name:"Omelete Macio"}],[{id:"0",qty:5},{id:"17",qty:2},{id:"14",qty:5},{id:"13",qty:2}]),
      new Meal ("8","Biscoito de Mel",[{name:"Limite de peso +50LT"},{name:"Velocidade de pesca +1"}], UtilsProvider.APRENDIZ+ " 6", UtilsProvider.MEAL_IMG_PATH + "honeycombCookie.png", [{name:"Biscoito de Mel Crocante"}],[{id:"11",qty:6},{id:"14",qty:2},{id:"9",qty:4},{id:"18",qty:2}]),
      new Meal ("9","Chá com Aroma Fino",[{name:"MP/SP/WP Máxima +50"}], UtilsProvider.APRENDIZ+ " 1", UtilsProvider.MEAL_IMG_PATH + "teaWithFineScent.png", [{name:"Chá com Aroma Fino Forte"}], [{id:"19",qty:4},{id:"20",qty:4},{id:"1",qty:7},{id:"11",qty:3}]),
      new Meal("10","Bife",[{name:"+50 HP Máx"}],UtilsProvider.APRENDIZ+ " 1", UtilsProvider.MEAL_IMG_PATH + "steak.png", [{name:"Bife Suculento"}], [{id:"4",qty:8},{id:"13",qty:2},{id:"21",qty:2},{id:"22",qty:2}]),
      new Meal("11","Pudim de Frutas",[{name:"Recuperação de MP/WP/SP +2"}] ,UtilsProvider.INICIANTE+ " 6", UtilsProvider.MEAL_IMG_PATH + "fruitPudding.png", [{name:"Pudim de Frutas Especial"}], [{id:"20",qty:5},{id:"23",qty:1},{id:"9",qty:3},{id:"2",qty:2}]),
      new Meal("12","Pão Macio",[{name:"Estamina Máx. +100"}],UtilsProvider.INICIANTE+ " 6", UtilsProvider.MEAL_IMG_PATH + "softBread.png", [{name:"Pão de Leite Úmido"}], [{id:"18",qty:6},{id:"6",qty:2},{id:"14",qty:2},{id:"9",qty:3}]),
      new Meal("13","Torta de Carne",[{name:"Estamina Máx. +200"}],UtilsProvider.APRENDIZ+ " 1", UtilsProvider.MEAL_IMG_PATH + "meatPie.png", [{name:"Torta de Carne Deliciosa"}], [{id:"4",qty:4},{id:"18",qty:6},{id:"3",qty:2},{id:"17",qty:2}]),
      new Meal("14","Molho Branco",undefined,UtilsProvider.INICIANTE+ " 1", UtilsProvider.MEAL_IMG_PATH + "whiteSauce.png", undefined, [{id:"24",qty:1},{id:"9",qty:1},{id:"20",qty:1},{id:"12",qty:2}]),
      new Meal("15","Molho Vermelho",undefined,UtilsProvider.INICIANTE+ " 1", UtilsProvider.MEAL_IMG_PATH + "redSauce.png", undefined, [{id:"24",qty:1},{id:"2",qty:2},{id:"4",qty:1},{id:"1",qty:2}]),
      new Meal("16","Croquete de Carne",[{name:"EXP de Combate +5%"}],UtilsProvider.APRENDIZ+ " 6",UtilsProvider.MEAL_IMG_PATH + "meatCroquette.png", [{name:"Croquete crocante de Carne"}], [{id:"4",qty:8},{id:"8",qty:5},{id:"14",qty:2},{id:"25",qty:2},{id:"15",qty:4}]),
      new Meal("17","Queijo Gratin",[{name:"HP Máx. +70"},{name:"Velocidade de Ataque +1"}],UtilsProvider.PROFISSIONAL+ " 3",UtilsProvider.MEAL_IMG_PATH + "gratinCheese.png",[{name:"Queijo Gratin Gostoso"}], [{id:"27",qty:1},{id:"18",qty:5},{id:"28",qty:4},{id:"25",qty:3},{id:"15",qty:3}]),
      new Meal("18","Bolinho do Deserto",[{name:"Estamina Máxima +200 por 60 min"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "desertDumpling.png",[{name:"Bolinho do Deserto Gostoso"}], [{id:"29",qty:6}, {id:"18",qty:6}, {id:"30",qty:1}, {id:"17",qty:2}]),
      new Meal("19","Vinho de Mel",undefined,UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "honeyWine.png",[{name:"Vinho de Mel Picante"}], [{id:"11",qty:3}, {id:"31",qty:2}, {id:"2",qty:2}, {id:"1",qty:6}]),
      new Meal("20","Essência de Liquor",undefined,UtilsProvider.PROFICIENTE+ " 1",UtilsProvider.MEAL_IMG_PATH + "liquorEssence.png", undefined, [{id:"8",qty:1}, {id:"20",qty:1}, {id:"6",qty:1}]),
      new Meal("21","Salsicha Grelhada",[{name:"Ataque Total +1"}],UtilsProvider.PROFICIENTE+ " 5",UtilsProvider.MEAL_IMG_PATH + "grilledSausage.png",[{name:"Linguiça Defumada"}], [{id:"4",qty:6}, {id:"10",qty:1}, {id:"26",qty:2}, {id:"13",qty:2}]),
      new Meal("22","Macarrão de Frutos do Mar",[{name:"Velocidade de Conjuração +1"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "seafoodPasta.png",[{name:"Pasta de Marisco"}], [{id:"32",qty:4}, {id:"18",qty:5}, {id:"12",qty:3}, {id:"21",qty:3}]),
      new Meal("23","Chá Mate",[{name:"EXP de Vida em +8%"}],UtilsProvider.PROFISSIONAL+ " 7",UtilsProvider.MEAL_IMG_PATH + "suteTea.png",[{name:"Chá Mate Saúdavel"}], [{id:"34",qty:2}, {id:"33",qty:2}, {id:"9",qty:3},{id:"13",qty:1}]),
      new Meal("24","Vinagre",undefined,UtilsProvider.PROFISSIONAL+ " 1",UtilsProvider.MEAL_IMG_PATH + "vinegar.png", undefined, [{id:"0",qty:1},{id:"20",qty:1},{id:"6",qty:1},{id:"2",qty:1}]),
      new Meal("25","Legumes em Conserva",[{name:"Velocidade de Coleta +1"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "pickledVegetables.png", [{name:"Legumes em Conserva Doce e Azedo"}], [{id:"28",qty:8}, {id:"35",qty:4}, {id:"6",qty:2}, {id:"2",qty:2}]),
      new Meal("26","Pudim Escuro",[{name:"Ataque Total +3"},{name:"Dano Adicional contra Humanoides +2"}],UtilsProvider.PROFISSIONAL+ " 7",UtilsProvider.MEAL_IMG_PATH + "darkPudding.png",[{name:"Pudim Escuro Sangrento"}], [{id:"3",qty:1},{id:"36",qty:1},{id:"7",qty:5},{id:"37",qty:7}]),
      //TODO: Adicionar Novas Imagens
      new Meal("27","Acompanhamentos Variados",[{name:"EXP de Vida +5%"}],UtilsProvider.PROFISSIONAL+ " 3",UtilsProvider.MEAL_IMG_PATH + "assortedSideDishes.png", [{name:"Pratos Abundantes de Acompanhamento"}], [{id:"30",qty:5},{id:"25",qty:3},{id:"32",qty:2},{id:"38",qty:1}]),
      new Meal("28","Pássaro Frito",[{name:"Recuperação de HP +5"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "friedBird.png", [{name:"Pássaro Recém-Frito"}], [{id:"26",qty:3},{id:"7",qty:7},{id:"8",qty:4},{id:"14",qty:2}]),
      new Meal("29","Salada de Carne de Baleia",[{name:"EXP de Vida +10%"},{name:"Energia Máxima +10"}],UtilsProvider.PROFISSIONAL+ " 1",UtilsProvider.MEAL_IMG_PATH + "whaleMeatSalad.png",[{name:"Salada de Carne de Baleia Fresca"}], [{id:"14",qty:3},{id:"26",qty:4},{id:"28",qty:6},{id:"39",qty:2},{id:"40",qty:1}]),
      new Meal("30","Tempero",undefined,UtilsProvider.PROFICIENTE+ " 1", UtilsProvider.MEAL_IMG_PATH + "dressing.png",undefined,[{id:"14",qty:1},{id:"1",qty:1},{id:"13",qty:2},{id:"17",qty:1}]),
      new Meal("31","Iogurte de Ervas",[{name:"Velocidade de pesca +1"}],UtilsProvider.PROFICIENTE+ " 5",UtilsProvider.MEAL_IMG_PATH + "aloeYogurt.png", [{name:"Iogurte de Aloes Forte"}],[{id:"2",qty:3},{id:"41",qty:5},{id:"6",qty:3},{id:"9",qty:2}]),
      new Meal("32","Vinho de Ervas Exóticas",[{name:"Velocidade de pesca +1"}],UtilsProvider.PROFICIENTE+ " 1",UtilsProvider.MEAL_IMG_PATH + "exoticHerbalWine.png", [{name:"Vinho de Ervas Exóticas Encorpado"}],[{id:"1",qty:5},{id:"18",qty:3},{id:"6",qty:2},{id:"31",qty:1}]),
      new Meal("33","Vinho de Frutas",[{name:"Velocidade de pesca +1"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "fruitWine.png", [{name:"Vinho de Fruta Gostoso"}],[{id:"1",qty:2},{id:"42",qty:1},{id:"20",qty:5},{id:"31",qty:3}]),
      new Meal("34","Refeição de Balenos",[{name:"Velocidade de pesca +2"},{name:"Velocidade de Coleta +2"},{name:"Velocidade de Movimento +2"}],UtilsProvider.ARTESAO+ " 1",UtilsProvider.MEAL_IMG_PATH + "balenosMeal.png", [{name:"Refeição de Balenos Especial"}],[{id:"43",qty:1},{id:"44",qty:1},{id:"45",qty:2},{id:"47",qty:2},{id:"48",qty:1}]),
      new Meal("35","Legumes Fritos",undefined,UtilsProvider.PROFICIENTE+ " 5",UtilsProvider.MEAL_IMG_PATH + "friedVegetables.png", [{name:"Legumes Fritos Crocantes"}],[{id:"17",qty:2},{id:"13",qty:1},{id:"46",qty:2},{id:"28",qty:5}]),
      new Meal("36","Filé de Peixe Defumado",[{name:"Velocidade de Ataque +1"}],UtilsProvider.PROFICIENTE+ " 9",UtilsProvider.MEAL_IMG_PATH + "smokedFishSteak.png", [{name:"Bife de Peixe Dourado Defumado"}],[{id:"5",qty:4},{id:"17",qty:1},{id:"13",qty:2}]),
    ];
    localStorage.setItem('mealList', JSON.stringify(mealList));   

    let lifeSkillEffectList = ["8","23","25","27","28","29","30","31","32","33","34","35","36"];
  }

  createIngredients(){
    let ingredients = [
      new Ingredient("0","Cereais",UtilsProvider.INGREDIENT_IMG_PATH + "corn.png", undefined, [{id:"0",qty:5},{id:"7",qty:5}]),
      new Ingredient("1","Água Mineral",UtilsProvider.INGREDIENT_IMG_PATH + "mineralWater.png", undefined, undefined),
      new Ingredient("2","Açúcar",UtilsProvider.INGREDIENT_IMG_PATH + "sugar.png",undefined, undefined),
      new Ingredient("3","Aveia",UtilsProvider.INGREDIENT_IMG_PATH + "oatmeal.png","3", [{id:"1",qty:2},{id:"13",qty:2},{id:"26",qty:1}]),
      new Ingredient("4","Carne",UtilsProvider.INGREDIENT_IMG_PATH + "meat.png",undefined, [{id:"10",qty:8},{id:"6",qty:5},{id:"1",qty:5},{id:"13",qty:4}]),
      new Ingredient("5","Peixe Desidratado",UtilsProvider.INGREDIENT_IMG_PATH + "driedFish.png",undefined,[{id:"1",qty:2},{id:"4",qty:2},{id:"5",qty:2}]),
      new Ingredient("6","Fermento",UtilsProvider.INGREDIENT_IMG_PATH + "leavingAgent.png",undefined, undefined),
      new Ingredient("7","Carne de Pássaro",UtilsProvider.INGREDIENT_IMG_PATH + "birdMeat.png",undefined, [{id:"1",qty:4},{id:"26",qty:5}]),
      new Ingredient("8","Farinha",UtilsProvider.INGREDIENT_IMG_PATH + "flour.png",undefined, undefined),
      new Ingredient("9","Leite",UtilsProvider.INGREDIENT_IMG_PATH + "milk.png",undefined, [{id:"12",qty:3},{id:"11",qty:3},{id:"3",qty:3},{id:"23",qty:3},{id:"8",qty:4}]),
      new Ingredient("10","Cebola",UtilsProvider.INGREDIENT_IMG_PATH + "onion.png",undefined, undefined),
      new Ingredient("11","Mel",UtilsProvider.INGREDIENT_IMG_PATH + "honey.png",undefined, [{id:"9",qty:3},{id:"8",qty:6},{id:"3",qty:2}]),
      new Ingredient("12","Vinho",UtilsProvider.INGREDIENT_IMG_PATH + "wine.png",undefined, undefined),
      new Ingredient("13","Sal",UtilsProvider.INGREDIENT_IMG_PATH + "salt.png",undefined, undefined),
      new Ingredient("14","Ovos de Pássaro",UtilsProvider.INGREDIENT_IMG_PATH + "egg.png",undefined, [{id:"2",qty:3},{id:"7",qty:5},{id:"8",qty:2},{id:"12",qty:2}]),
      new Ingredient("15","Oleo para Fritura",UtilsProvider.INGREDIENT_IMG_PATH + "fryingOil.png",undefined, undefined),  
      new Ingredient("16","Molho Branco",UtilsProvider.INGREDIENT_IMG_PATH + "whiteSauce.png","14", [{id:"5",qty:3}]),       
      new Ingredient("17","Oleo de Oliva",UtilsProvider.INGREDIENT_IMG_PATH + "oliveOil.png",undefined, undefined),       
      new Ingredient("18","Massa",UtilsProvider.INGREDIENT_IMG_PATH + "rough.png",undefined, [{id:"13",qty:6},{id:"12",qty:6},{id:"8",qty:4}]),
      new Ingredient("19","Plantas",UtilsProvider.INGREDIENT_IMG_PATH + "rose.png",undefined, undefined),
      new Ingredient("20","Frutas",UtilsProvider.INGREDIENT_IMG_PATH + "apple.png", undefined, [{id:"11",qty:5},{id:"9",qty:4}]),
      new Ingredient("21","Alho",UtilsProvider.INGREDIENT_IMG_PATH + "garlic.png",undefined, undefined),
      new Ingredient("22","Molho Vermelho",UtilsProvider.INGREDIENT_IMG_PATH + "redSauce.png","15", [{id:"10",qty:2}]),
      new Ingredient("23","Creme",UtilsProvider.INGREDIENT_IMG_PATH + "cream.png",undefined, undefined),
      new Ingredient("24","Molho Veid", UtilsProvider.INGREDIENT_IMG_PATH + "baseSauce.png",undefined, undefined),
      new Ingredient("25","Queijo", UtilsProvider.INGREDIENT_IMG_PATH + "cheese.png",undefined, undefined),
      new Ingredient("26","Pimenta do Reino", UtilsProvider.INGREDIENT_IMG_PATH + "pepper.png",undefined, undefined),
      new Ingredient("27","Salsicha Grelhada",UtilsProvider.INGREDIENT_IMG_PATH + "grilledSausage.png","21", [{id:"17",qty:1}]),
      new Ingredient("28","Legumes",UtilsProvider.INGREDIENT_IMG_PATH + "cabbage.png",undefined, undefined),
      new Ingredient("29","Carne de Réptil",UtilsProvider.INGREDIENT_IMG_PATH + "lizardMeat.png",undefined,[{id:"18",qty:6}]),
      new Ingredient("30","Canela",UtilsProvider.INGREDIENT_IMG_PATH + "cinnamon.png",undefined, undefined),
      new Ingredient("31","Essência de Liquor",UtilsProvider.INGREDIENT_IMG_PATH + "liquorEssence.png","20",[{id:"19",qty:2}]),
      new Ingredient("32","Frutos do Mar",UtilsProvider.INGREDIENT_IMG_PATH + "seafood.png",undefined,[{id:"22",qty:4}]),
      new Ingredient("33","Manteiga",UtilsProvider.INGREDIENT_IMG_PATH + "butter.png",undefined,undefined),
      new Ingredient("34","Chá com Aroma Fino", UtilsProvider.INGREDIENT_IMG_PATH + "teaWithFineScent.png", "9",undefined),
      new Ingredient("35","Vinagre",UtilsProvider.INGREDIENT_IMG_PATH + "vinegar.png", "24", undefined),
      new Ingredient("36","Legumes em Conserva",UtilsProvider.INGREDIENT_IMG_PATH + "pickledVegetables.png","25",undefined),
      new Ingredient("37","Sangue",UtilsProvider.INGREDIENT_IMG_PATH + "blood.png",undefined,[{id:"26",qty:7}]),
      //TODO: Adicionar Novas Imagens
      new Ingredient("38","Pássaro Frito",UtilsProvider.INGREDIENT_IMG_PATH + "friedBird.png","28",[{id:"27",qty:1}]),
      new Ingredient("39","Tempero",UtilsProvider.INGREDIENT_IMG_PATH + "dressing.png","30",[{id:"29",qty:2}]),
      new Ingredient("40","Carne de Baleia Azul",UtilsProvider.INGREDIENT_IMG_PATH + "blueWhaleMeat.png",undefined,[{id:"29",qty:1}]),
      new Ingredient("41","Aloes",UtilsProvider.INGREDIENT_IMG_PATH + "aloes.png",undefined,[{id:"31",qty:5}]),
      new Ingredient("42","Vinho de Ervas Exóticas",UtilsProvider.INGREDIENT_IMG_PATH + "exoticHerbalWine.png","32", [{id:"33",qty:1}]),
      new Ingredient("43","Croquete de Carne",UtilsProvider.INGREDIENT_IMG_PATH + "meatCroquette.png","16", [{id:"34",qty:1}]),
      new Ingredient("44","Queijo Gratin",UtilsProvider.INGREDIENT_IMG_PATH + "gratinCheese.png","17", [{id:"34",qty:1}]),
      new Ingredient("45","Cerveja", UtilsProvider.INGREDIENT_IMG_PATH + "beer.png","0",[{id:"34",qty:2}]),
      new Ingredient("46","Pimenta", UtilsProvider.INGREDIENT_IMG_PATH + "pepper2.png",undefined,[{id:"34",qty:2}]),
      new Ingredient("47","Legumes Fritos",UtilsProvider.MEAL_IMG_PATH + "friedVegetables.png", "35",[{id:"34",qty:2}]),
      new Ingredient("48","Filé de Peixe Defumado",UtilsProvider.MEAL_IMG_PATH + "smokedFishSteak.png","36", [{id:"34",qty:1}]),
    ];
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }
  createImperialCooking(){
    let local = "Heidel, Altinova e Calpheon";
    let imperialCookingList = [
      new ImperialItem("0","Baú de Peixe Frito",UtilsProvider.IMPERIAL_IMG_PATH + "friedFishCookingBox.png", UtilsProvider.APRENDIZ, local ,"4",20, 150000),
      new ImperialItem("1","Baú de Ovo Cozido de Pássaro",UtilsProvider.IMPERIAL_IMG_PATH + "boiledEggCookingBox.png", UtilsProvider.APRENDIZ, local,"2",20, 138000),      
      new ImperialItem("2","Baú de Sopa de Carne",UtilsProvider.IMPERIAL_IMG_PATH + "meatStewCookingBox.png", UtilsProvider.APRENDIZ, local,"6",20, 195000),
      new ImperialItem("3","Baú de File de Peixe",UtilsProvider.IMPERIAL_IMG_PATH + "fishFilletCookingBox.png", UtilsProvider.PROFICIENTE, local,"5",20, 160000),
      new ImperialItem("5","Baú de Pão Macio",UtilsProvider.IMPERIAL_IMG_PATH + "softBreadCookingBox.png",UtilsProvider.PROFICIENTE, local,"12",20, 192000),
      new ImperialItem("4","Baú de Pudim de Fruta",UtilsProvider.IMPERIAL_IMG_PATH + "fruitPuddingCookingBox.png",UtilsProvider.PROFICIENTE, local,"11",20, 212000),
      new ImperialItem("6","Baú de Cheiroso de Chá com Aroma Fino",UtilsProvider.IMPERIAL_IMG_PATH + "goodSmellingCookingBox.png",UtilsProvider.PROFISSIONAL, local,"9",30, 217000),
      new ImperialItem("7","Baú de Omelete",UtilsProvider.IMPERIAL_IMG_PATH + "omeleteCookingBox.png",UtilsProvider.PROFISSIONAL, local,"7",40, 205000),
      new ImperialItem("8","Baú de Carne",UtilsProvider.IMPERIAL_IMG_PATH + "steakCookingBox.png",UtilsProvider.PROFISSIONAL, local,"10",20, 242000),      
      new ImperialItem("9","Baú de Torta de Carne",UtilsProvider.IMPERIAL_IMG_PATH + "meatPieCookingBox.png",UtilsProvider.PROFISSIONAL, local,"13",30, 210000),
      new ImperialItem("10","Baú de Croquete de Carne",UtilsProvider.IMPERIAL_IMG_PATH + "meatCroquetteCookingBox.png",UtilsProvider.ARTESAO, local,"16",40, 410000),
      new ImperialItem("11","Baú de Queijo Gratinado",UtilsProvider.IMPERIAL_IMG_PATH + "cheeseGratinCookingBox.png",UtilsProvider.ARTESAO, local,"17",40, 410000),
      new ImperialItem("12","Baú de Bolinho do Deserto",UtilsProvider.IMPERIAL_IMG_PATH + "desertDumplingCookingBox.png",UtilsProvider.ARTESAO, local,"18",40, 277500),
      new ImperialItem("13","Baú de Vinho de Mel",UtilsProvider.IMPERIAL_IMG_PATH + "honeyWineCookingBox.png",UtilsProvider.ARTESAO, local,"19",50, 190000),
      new ImperialItem("14","Baú de Macarrão de Frutos do Mar",UtilsProvider.IMPERIAL_IMG_PATH + "seafoodPastaCookingBox.png",UtilsProvider.MESTRE, local,"22",40, 325000),
      new ImperialItem("15","Baú de Biscoito de Mel",UtilsProvider.IMPERIAL_IMG_PATH + "honeycombCookieCookingBox.png",UtilsProvider.MESTRE, local,"8",40, 362500),
      new ImperialItem("16","Baú de Chá Mate",UtilsProvider.IMPERIAL_IMG_PATH + "suteTeaCookingBox.png",UtilsProvider.MESTRE, local,"23",60, 472500),
      new ImperialItem("17","Baú de Pudim Escuro",UtilsProvider.IMPERIAL_IMG_PATH + "darkPuddingCookingBox.png",UtilsProvider.MESTRE, local,"26",60, 472500), 
    ];
    localStorage.setItem('imperialCookingList', JSON.stringify(imperialCookingList));   
  }
}
