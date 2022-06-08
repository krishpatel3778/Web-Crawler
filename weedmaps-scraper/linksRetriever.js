const axios= require('axios');
const ip=require("ip");
const fs=require("fs");
const agent= require('https-proxy-agent');
const httpsAgent = new agent({
    host: "proxy.apify.com",
    port: "8000",
    auth: "session-my_session:apify_proxy_8vbATzPXpNwfuMn6jCPfnQeeg1bjpZ41qM1t"
});
const axiosWithProxy= axios.create({httpsAgent});
const cheerio= require('cheerio');
const initialPage= "https://weedmaps.com";

async function getData(){
  var $= await loadPage(initialPage);
  var items=[];
  	var length=$('#__next > div.page-layout > div > section > div').contents().length;
  	for(var ii=1;ii<length+1;ii++){
  	items.push($("#__next > div.page-layout > div > section > div>div:nth-child("+ii+")>a").attr("href"));
  	};
  var itemss=[];
  var tracker=0;
  for(var i=0;i<items.length;i++){
  	if(items[i]!=undefined){
  		console.log("All the data for subregion: "+ $("#__next > div.page-layout > div > section > div>div:nth-child("+(i+1)+")").text());
  		itemss.push([]);
  		var content=await loadPage(initialPage+items[i]);
  		var lengthh=content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMS.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.region-subregions-tray__MapContentTrayInner-jf99ya-1.eDwkAX.hMPlpi.cflNTx").contents().length;
  		if(lengthh>0){
  			for(var x=1;x<lengthh;x++){
  				var stillMoreData=content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMS.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.region-subregions-tray__MapContentTrayInner-jf99ya-1.eDwkAX.hMPlpi.cflNTx > a:nth-child("+x+")").attr("href");
  				if(stillMoreData!=undefined){
  					await getAllDispensaries(stillMoreData,itemss,tracker);
  				}else{
  					itemss[tracker].push(content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMS.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.region-subregions-tray__MapContentTrayInner-jf99ya-1.eDwkAX.hMPlpi.cflNTx > div:nth-child("+x+") > div.map-no-border-style___StyledDiv-sc-1x8k6k3-1.fPsznQ > a").attr('href'));
  				}
  				fs.writeFileSync("Total.txt",itemss.toString());
  			}
  		}else{
  			await getAllDispensaries(items[i],itemss,tracker);
  		}
  		
  		tracker++;
  		fs.writeFileSync("Total.txt",itemss.toString());
  		console.log("----------------------------------------------------------------------------------------------------------------------------------------------");
  		await sleep(random(10000,20000));
  	}
  
  }
  //console.dir(itemss, {'maxArrayLength': 100000000000000000000000000});;
  
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}
async function loadPage(url){
	try{
	const a= await axiosWithProxy.get(url);
	//await sleep(random(1000,10000));
	return await cheerio.load(a.data);
	}catch(error){
		console.log("Locha Vagya! Hah khava dyo bapa.");
		await sleep(random(60000,90000));
		return await loadPage(url);
	}
}function random(min,max){
	return Math.floor(Math.random()*(max+1))+(max-min);
}
 async function getAllDispensaries(url,itemss,tracker){
 	var content=await loadPage(initialPage+url);
	var pagesString=content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.styles__ListWrapper-ik4t6d-6.eEPNSQ > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMx.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.map-content-tray-scroll-container__ScrollContainerOuter-sc-1y0hz3v-0.eDwkAX.hMPlpi.ffugFw > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__PaginationWrapper-sc-1gwqcve-1.eiQwDY.hMPlpi.eneCaf > nav > div > div > button > span").text().length;
  	var maxPage=parseInt(content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.styles__ListWrapper-ik4t6d-6.eEPNSQ > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMx.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.map-content-tray-scroll-container__ScrollContainerOuter-sc-1y0hz3v-0.eDwkAX.hMPlpi.ffugFw > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__PaginationWrapper-sc-1gwqcve-1.eiQwDY.hMPlpi.eneCaf > nav > div > div > button > span").text().substring(pagesString-1));
  			for(var p=0;p<maxPage;p++){
  				if(p>0){
  					content=await loadPage(initialPage+url+"?page="+(p+1));
  				}
  				var lengthh=content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.styles__ListWrapper-ik4t6d-6.eEPNSQ > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMx.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.map-content-tray-scroll-container__ScrollContainerOuter-sc-1y0hz3v-0.eDwkAX.hMPlpi.ffugFw > div > ul").contents().length;
  				console.log("Extracting "+initialPage+url+"?page="+(p+1)+" with "+lengthh+"products");
  				for(var l=1;l<lengthh+1;l++){
  				itemss[tracker].push(content("#content > div > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styles__MapWrapper-ik4t6d-5.fbAXPT.hMPlpi.eJIPcK > div.styles__ListWrapper-ik4t6d-6.eEPNSQ > div.drawer__StyledDrawer-sc-1ai344x-0.bwwgMx.map-content-tray__ResponsiveDrawer-sc-1jlvdww-0.bUFAkm > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.map-content-tray-scroll-container__ScrollContainerOuter-sc-1y0hz3v-0.eDwkAX.hMPlpi.ffugFw > div > ul > li:nth-child("+l+") > div > div > div > a").attr("href"));
  			}
  	}
}
//getData();
module.exports={initialPage,loadPage,sleep,random}

