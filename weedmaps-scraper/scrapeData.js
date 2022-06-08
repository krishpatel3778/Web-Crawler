const needed=require("./linksRetriever.js");
var fs=require("fs");
var input=fs.readFileSync("copy.txt").toString();
var array=input.split(",");
var totalData=[];
async function scrape(){
	for(var i=0;i<3;i++){
		if(array[i]!=""){
			var data={};
			data.source=needed.initialPage+array[i]+"/about";
			var c=await needed.loadPage(needed.initialPage+array[i]+"/about");
			//document.querySelector("#content > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styled-components__HeaderContainer-sc-1sy7kcj-0.eiQwDY.hMPlpi.cWarkZ > div.styled-components__ColumnOne-sc-1sy7kcj-1.bniRzh > div.src__Box-sc-1sbtrzs-0.sc-gsTEea.crNPSi.VJjSa > div > div.header-info__Columns-sc-1heoxjr-0.esBweP > div:nth-child(3) > div")
			data.businessType=c("#content > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styled-components__HeaderContainer-sc-1sy7kcj-0.eiQwDY.hMPlpi.cWarkZ > div.styled-components__ColumnOne-sc-1sy7kcj-1.bniRzh > div.src__Box-sc-1sbtrzs-0.sc-dlfnuX.crNPSi.gzKNxW > div > div.header-info__Columns-sc-1heoxjr-0.esBweP > div:nth-child(1)").find('p');
			data.businessName=c("#content > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styled-components__HeaderContainer-sc-1sy7kcj-0.eiQwDY.hMPlpi.cWarkZ > div.styled-components__ColumnOne-sc-1sy7kcj-1.bniRzh > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.bwfxmC.hMPlpi > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.listing-header___StyledFlex-zgze8e-0.jDsRIg.hMPlpi.kJruso > div.styled-components__ListingNameWrapper-sc-1sy7kcj-6.iPEmZN").text();
			data.averageRating=c("#content > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styled-components__HeaderContainer-sc-1sy7kcj-0.eiQwDY.hMPlpi.cWarkZ > div.styled-components__ColumnOne-sc-1sy7kcj-1.bniRzh > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.bwfxmC.hMPlpi > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.listing-header___StyledFlex-zgze8e-0.jDsRIg.hMPlpi.kJruso > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.kYRkNj.hMPlpi > a > div > div.text__Text-fif1uk-0.rating__RatingValue-sc-12pds58-1.bxKWBW.hqJOrO").text();
			data.totalReviews=c("#content > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.styled-components__HeaderContainer-sc-1sy7kcj-0.eiQwDY.hMPlpi.cWarkZ > div.styled-components__ColumnOne-sc-1sy7kcj-1.bniRzh > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.bwfxmC.hMPlpi > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.listing-header___StyledFlex-zgze8e-0.jDsRIg.hMPlpi.kJruso > div.src__Box-sc-1sbtrzs-0.src__Flex-sc-1sbtrzs-1.kYRkNj.hMPlpi > a > div > div.text__Text-fif1uk-0.rating__Count-sc-12pds58-2.eAWqTU.dEUqbC").text();
			data.licenseNum=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > main > div.styled-components__Section-sc-1vkss9-3.styled-components__LicenseSection-sc-1vkss9-6.bQDhHc.kylqDD > p").text();
			var amenities=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > main > div.styled-components__Section-sc-1vkss9-3.styled-components__AmenitiesSection-sc-1vkss9-5.bQDhHc.ckmgOp > div").text().toLowerCase();
			data.ATM=converter(amenities.indexOf('atm'));
			data.security=converter(amenities.indexOf('security'));
			data.accessible=converter(amenities.indexOf('accessible'));
			data.verifiedseller=converter(amenities.indexOf('verified'));
			data["18+"]=converter(c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > main > div.styled-components__Section-sc-1vkss9-3.styled-components__AmenitiesSection-sc-1vkss9-5.bQDhHc.ckmgOp > div > div:nth-child(2)").attr("data-testid").indexOf("18"));
			data.streetAddress=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__Address-sc-5o6q5l-6.cmqOSf.fdJlcn.kRJJAX > div > div > div > div:nth-child(1)").text();
			var t=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__Address-sc-5o6q5l-6.cmqOSf.fdJlcn.kRJJAX > div > div > div > div:nth-child(2)").text().split(",");
			var z=t[1].split(" ");
			data.city=t[0];
			data.state=z[1];
			data.zip=z[3];
			data.phoneNumber=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__PhoneNumber-sc-5o6q5l-8.cmqOSf.fdJlcn.Okikg").text();
			data.email=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__Email-sc-5o6q5l-3.cmqOSf.fdJlcn.hFBWQU").text();
			data.websiteaddress=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__Website-sc-5o6q5l-4.cmqOSf.fdJlcn.hDwgEU").text();
			var media=c("#content > div.src__Box-sc-1sbtrzs-0.listing-detail-layout__ContentWrapper-sc-12hzhre-0.glRKBO.fXvHDo > div > div > aside > div > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGrid-sc-5o6q5l-9.liXnrj.czaOQr > div.src__Box-sc-1sbtrzs-0.styled-components__DetailGridItem-sc-5o6q5l-0.styled-components__SocialMedia-sc-5o6q5l-5.cmqOSf.fdJlcn.iGkDxN > div > div > div > div").text().toLowerCase();
			data.instagram=converter(media.indexOf("instagram"));
			data.twitter=converter(media.indexOf("twitter"));
			data.youtube=converter(media.indexOf("youtube"));
			data.facebook=converter(media.indexOf("facebook"));
			totalData.push(data);
		}
	}
	console.log(totalData);
}
function converter(num){
	if(num<0){
		return 0;
	}else{
	return 1;
	}
}
scrape();