import React from "react";
import "./countryCode.css";

class CountryCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <select
          aria-hidden="true"
          className="select4"
          name="countryCode"
          onChange={(e) => this.props.changeCountryCode(e.target.value)}
        >
          <option value="1">
            +1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Canada
          </option>
          <option value="1">
            +1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dominican
            Republic
          </option>
          <option value="1">
            +1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Puerto Rico
          </option>
          <option selected="" value="1">
            +1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; United States
          </option>
          <option value="7">
            +7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kazakhstan
          </option>
          <option value="7">
            +7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Russia
          </option>
          <option value="20">
            +20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Egypt
          </option>
          <option value="27">
            +27&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; South Africa
          </option>
          <option value="30">
            +30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Greece
          </option>
          <option value="31">
            +31&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Netherlands
          </option>
          <option value="32">
            +32&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Belgium
          </option>
          <option value="33">
            +33&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; France
          </option>
          <option value="34">
            +34&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Spain
          </option>
          <option value="36">
            +36&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Hungary
          </option>
          <option value="39">
            +39&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Italy
          </option>
          <option value="39">
            +39&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vatican City
          </option>
          <option value="40">
            +40&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Romania
          </option>
          <option value="41">
            +41&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Switzerland
          </option>
          <option value="43">
            +43&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Austria
          </option>
          <option value="44">
            +44&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Guernsey
          </option>
          <option value="44">
            +44&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Isle of Man
          </option>
          <option value="44">
            +44&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Jersey
          </option>
          <option value="44">
            +44&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; United Kingdom
          </option>
          <option value="45">
            +45&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Denmark
          </option>
          <option value="46">
            +46&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sweden
          </option>
          <option value="47">
            +47&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Norway
          </option>
          <option value="47">
            +47&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Svalbard and Jan Mayen
          </option>
          <option value="48">
            +48&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Poland
          </option>
          <option value="49">
            +49&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Germany
          </option>
          <option value="51">
            +51&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Peru
          </option>
          <option value="52">
            +52&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mexico
          </option>
          <option value="53">
            +53&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cuba
          </option>
          <option value="54">
            +54&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Argentina
          </option>
          <option value="55">
            +55&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Brazil
          </option>
          <option value="56">
            +56&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chile
          </option>
          <option value="57">
            +57&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Colombia
          </option>
          <option value="58">
            +58&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Venezuela
          </option>
          <option value="60">
            +60&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Malaysia
          </option>
          <option value="61">
            +61&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Australia
          </option>
          <option value="61">
            +61&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Christmas Island
          </option>
          <option value="61">
            +61&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cocos
          </option>
          <option value="62">
            +62&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Indonesia
          </option>
          <option value="63">
            +63&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Philippines
          </option>
          <option value="64">
            +64&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; New Zealand
          </option>
          <option value="65">
            +65&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Singapore
          </option>
          <option value="66">
            +66&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thailand
          </option>
          <option value="81">
            +81&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Japan
          </option>
          <option value="82">
            +82&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; South Korea
          </option>
          <option value="84">
            +84&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vietnam
          </option>
          <option value="86">
            +86&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; China
          </option>
          <option value="90">
            +90&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Turkey
          </option>
          <option value="91">
            +91&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; India
          </option>
          <option value="92">
            +92&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Pakistan
          </option>
          <option value="93">
            +93&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Afghanistan
          </option>
          <option value="94">
            +94&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sri Lanka
          </option>
          <option value="95">
            +95&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Myanmar (Burma)
          </option>
          <option value="98">
            +98&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Iran
          </option>
          <option value="211">+211&nbsp;&nbsp;&nbsp;&nbsp; South Sudan</option>
          <option value="212">+212&nbsp;&nbsp;&nbsp;&nbsp; Morocco</option>
          <option value="212">
            +212&nbsp;&nbsp;&nbsp;&nbsp; Western Sahara
          </option>
          <option value="213">+213&nbsp;&nbsp;&nbsp;&nbsp; Algeria</option>
          <option value="216">+216&nbsp;&nbsp;&nbsp;&nbsp; Tunisia</option>
          <option value="218">+218&nbsp;&nbsp;&nbsp;&nbsp; Libya</option>
          <option value="220">+220&nbsp;&nbsp;&nbsp;&nbsp; Gambia</option>
          <option value="221">+221&nbsp;&nbsp;&nbsp;&nbsp; Senegal</option>
          <option value="222">+222&nbsp;&nbsp;&nbsp;&nbsp; Mauritania</option>
          <option value="223">+223&nbsp;&nbsp;&nbsp;&nbsp; Mali</option>
          <option value="224">+224&nbsp;&nbsp;&nbsp;&nbsp; Guinea</option>
          <option value="225">
            +225&nbsp;&nbsp;&nbsp;&nbsp; Côte d’Ivoire
          </option>
          <option value="226">+226&nbsp;&nbsp;&nbsp;&nbsp; Burkina Faso</option>
          <option value="227">+227&nbsp;&nbsp;&nbsp;&nbsp; Niger</option>
          <option value="228">+228&nbsp;&nbsp;&nbsp;&nbsp; Togo</option>
          <option value="229">+229&nbsp;&nbsp;&nbsp;&nbsp; Benin</option>
          <option value="230">+230&nbsp;&nbsp;&nbsp;&nbsp; Mauritius</option>
          <option value="231">+231&nbsp;&nbsp;&nbsp;&nbsp; Liberia</option>
          <option value="232">+232&nbsp;&nbsp;&nbsp;&nbsp; Sierra Leone</option>
          <option value="233">+233&nbsp;&nbsp;&nbsp;&nbsp; Ghana</option>
          <option value="234">+234&nbsp;&nbsp;&nbsp;&nbsp; Nigeria</option>
          <option value="235">+235&nbsp;&nbsp;&nbsp;&nbsp; Chad</option>
          <option value="236">
            +236&nbsp;&nbsp;&nbsp;&nbsp; Central African Republic
          </option>
          <option value="237">+237&nbsp;&nbsp;&nbsp;&nbsp; Cameroon</option>
          <option value="238">+238&nbsp;&nbsp;&nbsp;&nbsp; Cape Verde</option>
          <option value="239">
            +239&nbsp;&nbsp;&nbsp;&nbsp; São Tomé and Príncipe
          </option>
          <option value="240">
            +240&nbsp;&nbsp;&nbsp;&nbsp; Equatorial Guinea
          </option>
          <option value="241">+241&nbsp;&nbsp;&nbsp;&nbsp; Gabon</option>
          <option value="242">
            +242&nbsp;&nbsp;&nbsp;&nbsp; Congo (Republic)
          </option>
          <option value="243">+243&nbsp;&nbsp;&nbsp;&nbsp; Congo (DRC)</option>
          <option value="244">+244&nbsp;&nbsp;&nbsp;&nbsp; Angola</option>
          <option value="245">
            +245&nbsp;&nbsp;&nbsp;&nbsp; Guinea-Bissau
          </option>
          <option value="246">
            +246&nbsp;&nbsp;&nbsp;&nbsp; British Indian Ocean Territory
          </option>
          <option value="248">+248&nbsp;&nbsp;&nbsp;&nbsp; Seychelles</option>
          <option value="249">+249&nbsp;&nbsp;&nbsp;&nbsp; Sudan</option>
          <option value="250">+250&nbsp;&nbsp;&nbsp;&nbsp; Rwanda</option>
          <option value="251">+251&nbsp;&nbsp;&nbsp;&nbsp; Ethiopia</option>
          <option value="252">+252&nbsp;&nbsp;&nbsp;&nbsp; Somalia</option>
          <option value="253">+253&nbsp;&nbsp;&nbsp;&nbsp; Djibouti</option>
          <option value="254">+254&nbsp;&nbsp;&nbsp;&nbsp; Kenya</option>
          <option value="255">+255&nbsp;&nbsp;&nbsp;&nbsp; Tanzania</option>
          <option value="256">+256&nbsp;&nbsp;&nbsp;&nbsp; Uganda</option>
          <option value="257">+257&nbsp;&nbsp;&nbsp;&nbsp; Burundi</option>
          <option value="258">+258&nbsp;&nbsp;&nbsp;&nbsp; Mozambique</option>
          <option value="260">+260&nbsp;&nbsp;&nbsp;&nbsp; Zambia</option>
          <option value="261">+261&nbsp;&nbsp;&nbsp;&nbsp; Madagascar</option>
          <option value="262">+262&nbsp;&nbsp;&nbsp;&nbsp; Mayotte</option>
          <option value="262">+262&nbsp;&nbsp;&nbsp;&nbsp; Réunion</option>
          <option value="263">+263&nbsp;&nbsp;&nbsp;&nbsp; Zimbabwe</option>
          <option value="264">+264&nbsp;&nbsp;&nbsp;&nbsp; Namibia</option>
          <option value="265">+265&nbsp;&nbsp;&nbsp;&nbsp; Malawi</option>
          <option value="266">+266&nbsp;&nbsp;&nbsp;&nbsp; Lesotho</option>
          <option value="267">+267&nbsp;&nbsp;&nbsp;&nbsp; Botswana</option>
          <option value="268">+268&nbsp;&nbsp;&nbsp;&nbsp; Swaziland</option>
          <option value="269">+269&nbsp;&nbsp;&nbsp;&nbsp; Comoros</option>
          <option value="290">+290&nbsp;&nbsp;&nbsp;&nbsp; Saint Helena</option>
          <option value="291">+291&nbsp;&nbsp;&nbsp;&nbsp; Eritrea</option>
          <option value="297">+297&nbsp;&nbsp;&nbsp;&nbsp; Aruba</option>
          <option value="298">
            +298&nbsp;&nbsp;&nbsp;&nbsp; Faroe Islands
          </option>
          <option value="299">+299&nbsp;&nbsp;&nbsp;&nbsp; Greenland</option>
          <option value="350">+350&nbsp;&nbsp;&nbsp;&nbsp; Gibraltar</option>
          <option value="351">+351&nbsp;&nbsp;&nbsp;&nbsp; Portugal</option>
          <option value="352">+352&nbsp;&nbsp;&nbsp;&nbsp; Luxembourg</option>
          <option value="353">+353&nbsp;&nbsp;&nbsp;&nbsp; Ireland</option>
          <option value="354">+354&nbsp;&nbsp;&nbsp;&nbsp; Iceland</option>
          <option value="355">+355&nbsp;&nbsp;&nbsp;&nbsp; Albania</option>
          <option value="356">+356&nbsp;&nbsp;&nbsp;&nbsp; Malta</option>
          <option value="357">+357&nbsp;&nbsp;&nbsp;&nbsp; Cyprus</option>
          <option value="358">+358&nbsp;&nbsp;&nbsp;&nbsp; Finland</option>
          <option value="358">
            +358&nbsp;&nbsp;&nbsp;&nbsp; Åland Islands
          </option>
          <option value="359">+359&nbsp;&nbsp;&nbsp;&nbsp; Bulgaria</option>
          <option value="370">+370&nbsp;&nbsp;&nbsp;&nbsp; Lithuania</option>
          <option value="371">+371&nbsp;&nbsp;&nbsp;&nbsp; Latvia</option>
          <option value="372">+372&nbsp;&nbsp;&nbsp;&nbsp; Estonia</option>
          <option value="373">+373&nbsp;&nbsp;&nbsp;&nbsp; Moldova</option>
          <option value="374">+374&nbsp;&nbsp;&nbsp;&nbsp; Armenia</option>
          <option value="375">+375&nbsp;&nbsp;&nbsp;&nbsp; Belarus</option>
          <option value="376">+376&nbsp;&nbsp;&nbsp;&nbsp; Andorra</option>
          <option value="377">+377&nbsp;&nbsp;&nbsp;&nbsp; Monaco</option>
          <option value="378">+378&nbsp;&nbsp;&nbsp;&nbsp; San Marino</option>
          <option value="380">+380&nbsp;&nbsp;&nbsp;&nbsp; Ukraine</option>
          <option value="381">+381&nbsp;&nbsp;&nbsp;&nbsp; Serbia</option>
          <option value="382">+382&nbsp;&nbsp;&nbsp;&nbsp; Montenegro</option>
          <option value="383">+383&nbsp;&nbsp;&nbsp;&nbsp; Kosovo</option>
          <option value="385">+385&nbsp;&nbsp;&nbsp;&nbsp; Croatia</option>
          <option value="386">+386&nbsp;&nbsp;&nbsp;&nbsp; Slovenia</option>
          <option value="387">
            +387&nbsp;&nbsp;&nbsp;&nbsp; Bosnia and Herzegovina
          </option>
          <option value="389">
            +389&nbsp;&nbsp;&nbsp;&nbsp; Macedonia (FYROM)
          </option>
          <option value="420">
            +420&nbsp;&nbsp;&nbsp;&nbsp; Czech Republic
          </option>
          <option value="421">+421&nbsp;&nbsp;&nbsp;&nbsp; Slovakia</option>
          <option value="423">
            +423&nbsp;&nbsp;&nbsp;&nbsp; Liechtenstein
          </option>
          <option value="500">
            +500&nbsp;&nbsp;&nbsp;&nbsp; Falkland Islands
          </option>
          <option value="501">+501&nbsp;&nbsp;&nbsp;&nbsp; Belize</option>
          <option value="502">+502&nbsp;&nbsp;&nbsp;&nbsp; Guatemala</option>
          <option value="503">+503&nbsp;&nbsp;&nbsp;&nbsp; El Salvador</option>
          <option value="504">+504&nbsp;&nbsp;&nbsp;&nbsp; Honduras</option>
          <option value="505">+505&nbsp;&nbsp;&nbsp;&nbsp; Nicaragua</option>
          <option value="506">+506&nbsp;&nbsp;&nbsp;&nbsp; Costa Rica</option>
          <option value="507">+507&nbsp;&nbsp;&nbsp;&nbsp; Panama</option>
          <option value="508">
            +508&nbsp;&nbsp;&nbsp;&nbsp; Saint Pierre and Miquelon
          </option>
          <option value="509">+509&nbsp;&nbsp;&nbsp;&nbsp; Haiti</option>
          <option value="590">+590&nbsp;&nbsp;&nbsp;&nbsp; Guadeloupe</option>
          <option value="590">
            +590&nbsp;&nbsp;&nbsp;&nbsp; Saint Barthélemy
          </option>
          <option value="590">+590&nbsp;&nbsp;&nbsp;&nbsp; Saint Martin</option>
          <option value="591">+591&nbsp;&nbsp;&nbsp;&nbsp; Bolivia</option>
          <option value="592">+592&nbsp;&nbsp;&nbsp;&nbsp; Guyana</option>
          <option value="593">+593&nbsp;&nbsp;&nbsp;&nbsp; Ecuador</option>
          <option value="594">
            +594&nbsp;&nbsp;&nbsp;&nbsp; French Guiana
          </option>
          <option value="595">+595&nbsp;&nbsp;&nbsp;&nbsp; Paraguay</option>
          <option value="596">+596&nbsp;&nbsp;&nbsp;&nbsp; Martinique</option>
          <option value="597">+597&nbsp;&nbsp;&nbsp;&nbsp; Suriname</option>
          <option value="598">+598&nbsp;&nbsp;&nbsp;&nbsp; Uruguay</option>
          <option value="599">
            +599&nbsp;&nbsp;&nbsp;&nbsp; Caribbean Netherlands
          </option>
          <option value="599">+599&nbsp;&nbsp;&nbsp;&nbsp; Curaçao</option>
          <option value="670">+670&nbsp;&nbsp;&nbsp;&nbsp; Timor-Leste</option>
          <option value="672">
            +672&nbsp;&nbsp;&nbsp;&nbsp; Norfolk Island
          </option>
          <option value="673">+673&nbsp;&nbsp;&nbsp;&nbsp; Brunei</option>
          <option value="674">+674&nbsp;&nbsp;&nbsp;&nbsp; Nauru</option>
          <option value="675">
            +675&nbsp;&nbsp;&nbsp;&nbsp; Papua New Guinea
          </option>
          <option value="676">+676&nbsp;&nbsp;&nbsp;&nbsp; Tonga</option>
          <option value="677">
            +677&nbsp;&nbsp;&nbsp;&nbsp; Solomon Islands
          </option>
          <option value="678">+678&nbsp;&nbsp;&nbsp;&nbsp; Vanuatu</option>
          <option value="679">+679&nbsp;&nbsp;&nbsp;&nbsp; Fiji</option>
          <option value="680">+680&nbsp;&nbsp;&nbsp;&nbsp; Palau</option>
          <option value="681">
            +681&nbsp;&nbsp;&nbsp;&nbsp; Wallis and Futuna
          </option>
          <option value="682">+682&nbsp;&nbsp;&nbsp;&nbsp; Cook Islands</option>
          <option value="683">+683&nbsp;&nbsp;&nbsp;&nbsp; Niue</option>
          <option value="685">+685&nbsp;&nbsp;&nbsp;&nbsp; Samoa</option>
          <option value="686">+686&nbsp;&nbsp;&nbsp;&nbsp; Kiribati</option>
          <option value="687">
            +687&nbsp;&nbsp;&nbsp;&nbsp; New Caledonia
          </option>
          <option value="688">+688&nbsp;&nbsp;&nbsp;&nbsp; Tuvalu</option>
          <option value="689">
            +689&nbsp;&nbsp;&nbsp;&nbsp; French Polynesia
          </option>
          <option value="690">+690&nbsp;&nbsp;&nbsp;&nbsp; Tokelau</option>
          <option value="691">+691&nbsp;&nbsp;&nbsp;&nbsp; Micronesia</option>
          <option value="692">
            +692&nbsp;&nbsp;&nbsp;&nbsp; Marshall Islands
          </option>
          <option value="850">+850&nbsp;&nbsp;&nbsp;&nbsp; North Korea</option>
          <option value="852">+852&nbsp;&nbsp;&nbsp;&nbsp; Hong Kong</option>
          <option value="853">+853&nbsp;&nbsp;&nbsp;&nbsp; Macau</option>
          <option value="855">+855&nbsp;&nbsp;&nbsp;&nbsp; Cambodia</option>
          <option value="856">+856&nbsp;&nbsp;&nbsp;&nbsp; Laos</option>
          <option value="880">+880&nbsp;&nbsp;&nbsp;&nbsp; Bangladesh</option>
          <option value="886">+886&nbsp;&nbsp;&nbsp;&nbsp; Taiwan</option>
          <option value="960">+960&nbsp;&nbsp;&nbsp;&nbsp; Maldives</option>
          <option value="961">+961&nbsp;&nbsp;&nbsp;&nbsp; Lebanon</option>
          <option value="962">+962&nbsp;&nbsp;&nbsp;&nbsp; Jordan</option>
          <option value="963">+963&nbsp;&nbsp;&nbsp;&nbsp; Syria</option>
          <option value="964">+964&nbsp;&nbsp;&nbsp;&nbsp; Iraq</option>
          <option value="965">+965&nbsp;&nbsp;&nbsp;&nbsp; Kuwait</option>
          <option value="966">+966&nbsp;&nbsp;&nbsp;&nbsp; Saudi Arabia</option>
          <option value="967">+967&nbsp;&nbsp;&nbsp;&nbsp; Yemen</option>
          <option value="968">+968&nbsp;&nbsp;&nbsp;&nbsp; Oman</option>
          <option value="970">+970&nbsp;&nbsp;&nbsp;&nbsp; Palestine</option>
          <option value="971">
            +971&nbsp;&nbsp;&nbsp;&nbsp; United Arab Emirates
          </option>
          <option value="972">+972&nbsp;&nbsp;&nbsp;&nbsp; Israel</option>
          <option value="973">+973&nbsp;&nbsp;&nbsp;&nbsp; Bahrain</option>
          <option value="974">+974&nbsp;&nbsp;&nbsp;&nbsp; Qatar</option>
          <option value="975">+975&nbsp;&nbsp;&nbsp;&nbsp; Bhutan</option>
          <option value="976">+976&nbsp;&nbsp;&nbsp;&nbsp; Mongolia</option>
          <option value="977">+977&nbsp;&nbsp;&nbsp;&nbsp; Nepal</option>
          <option value="992">+992&nbsp;&nbsp;&nbsp;&nbsp; Tajikistan</option>
          <option value="993">+993&nbsp;&nbsp;&nbsp;&nbsp; Turkmenistan</option>
          <option value="994">+994&nbsp;&nbsp;&nbsp;&nbsp; Azerbaijan</option>
          <option value="995">+995&nbsp;&nbsp;&nbsp;&nbsp; Georgia</option>
          <option value="996">+996&nbsp;&nbsp;&nbsp;&nbsp; Kyrgyzstan</option>
          <option value="998">+998&nbsp;&nbsp;&nbsp;&nbsp; Uzbekistan</option>
          <option value="1242">+1242&nbsp;&nbsp; Bahamas</option>
          <option value="1246">+1246&nbsp;&nbsp; Barbados</option>
          <option value="1264">+1264&nbsp;&nbsp; Anguilla</option>
          <option value="1268">+1268&nbsp;&nbsp; Antigua and Barbuda</option>
          <option value="1284">+1284&nbsp;&nbsp; British Virgin Islands</option>
          <option value="1340">+1340&nbsp;&nbsp; U.S. Virgin Islands</option>
          <option value="1345">+1345&nbsp;&nbsp; Cayman Islands</option>
          <option value="1441">+1441&nbsp;&nbsp; Bermuda</option>
          <option value="1473">+1473&nbsp;&nbsp; Grenada</option>
          <option value="1649">
            +1649&nbsp;&nbsp; Turks and Caicos Islands
          </option>
          <option value="1664">+1664&nbsp;&nbsp; Montserrat</option>
          <option value="1670">
            +1670&nbsp;&nbsp; Northern Mariana Islands
          </option>
          <option value="1671">+1671&nbsp;&nbsp; Guam</option>
          <option value="1684">+1684&nbsp;&nbsp; American Samoa</option>
          <option value="1721">+1721&nbsp;&nbsp; Sint Maarten</option>
          <option value="1758">+1758&nbsp;&nbsp; Saint Lucia</option>
          <option value="1767">+1767&nbsp;&nbsp; Dominica</option>
          <option value="1784">
            +1784&nbsp;&nbsp; Saint Vincent and the Grenadines
          </option>
          <option value="1868">+1868&nbsp;&nbsp; Trinidad and Tobago</option>
          <option value="1869">+1869&nbsp;&nbsp; Saint Kitts and Nevis</option>
          <option value="1876">+1876&nbsp;&nbsp; Jamaica</option>
        </select>
        {/* <div aria-label="Select your country code" className="select5">
          ▾
        </div> */}
      </>
    );
  }
}

export default CountryCode;
