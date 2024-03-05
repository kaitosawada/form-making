"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFormatter = void 0;
const omitHyphen = (value) => {
    return value.replace(/[^\d]/g, "");
};
const formatTel = (value) => {
    let result = omitHyphen(value);
    result = result.replace(/^0(9969|9913|9912|9802|9496|8636|8514|8512|8477|8396|8388|8387|7468|5979|5769|4998|4996|4994|4992|1658|1656|1655|1654|1648|1635|1634|1632|1587|1586|1564|1558|1547|1466|1457|1456|1398|1397|1392|1377|1374|1372|1267)(\d)(\d{4})$/, "0$1-$2-$3"); //固定電話市外4桁
    result = result.replace(/^0(997|996|995|994|993|987|986|985|984|983|982|980|979|978|977|974|973|972|969|968|967|966|965|964|959|957|956|955|954|952|950|949|948|947|946|944|943|942|940|930|920|898|897|896|895|894|893|892|889|887|885|884|883|880|879|877|875|869|868|867|866|865|863|859|858|857|856|855|854|853|852|848|847|846|845|838|837|836|835|834|833|829|827|826|824|823|820|799|798|797|796|795|794|791|790|779|778|776|774|773|772|771|770|768|767|766|765|763|761|749|748|747|746|745|744|743|742|740|739|738|737|736|735|725|721|599|598|597|596|595|594|587|586|585|584|581|578|577|576|575|574|573|572|569|568|567|566|565|564|563|562|561|558|557|556|555|554|553|551|550|548|547|545|544|539|538|537|536|533|532|531|495|494|493|480|479|478|476|475|470|467|466|465|463|460|439|438|436|428|422|299|297|296|295|294|293|291|289|288|287|285|284|283|282|280|279|278|277|276|274|270|269|268|267|266|265|264|263|261|260|259|258|257|256|255|254|250|248|247|246|244|243|242|241|240|238|237|235|234|233|229|228|226|225|224|223|220|198|197|195|194|193|192|191|187|186|185|184|183|182|179|178|176|175|174|173|172|167|166|165|164|163|162|158|157|156|155|154|153|152|146|145|144|143|142|139|138|137|136|135|134|133|126|125|124|123)(\d{2})(\d{4})$/, "0$1-$2-$3"); //固定電話市外3桁
    result = result.replace(/^0(99|98|97|96|95|93|92|89|88|87|86|84|83|82|79|78|77|76|75|73|72|59|58|55|54|53|52|49|48|47|46|45|44|43|42|29|28|27|26|25|24|23|22|19|18|17|15|11)(\d{3})(\d{4})$/, "0$1-$2-$3"); //固定電話市外2桁
    result = result.replace(/^0(6|4|3)(\d{4})(\d{4})$/, "0$1-$2-$3"); //固定電話市外1桁
    result = result.replace(/^0(120|800|570|990)(\d{2})(\d{4})$/, "0$1-$2-$3"); //その他3桁
    result = result.replace(/^0(50|70|80|90|20|60)(\d{4})(\d{4})$/, "0$1-$2-$3"); //その他2桁
    return result === value ? value : result;
};
const formatPostcode = (value) => {
    let result = omitHyphen(value);
    result = result.replace(/^(\d{3})(\d{4})$/, "$1-$2");
    return result === value ? value : result;
};
// schemaの一部と他のフィールドを参照してデータを正規化する関数を返す
const createFormatter = (input) => (self) => {
    if (input.component === "textfield" && input.format && typeof self === "string") {
        let result = self;
        for (const format of input.format) {
            if (format.function === "tel") {
                result = formatTel(result);
            }
            if (format.function === "postcode") {
                result = formatPostcode(result);
            }
        }
        return result;
    }
    return self;
};
exports.createFormatter = createFormatter;
