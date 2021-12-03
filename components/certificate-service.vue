<template>
  <div>
    <div class="md:container md:mx-auto">
      <div class="mt-2 text-2xl text-black">
        <div id="printMe">
          <div class="text-center">
            <h2>Bangladesh Bridge Authority</h2>
            <h3>Bridges Division</h3>
            <p>Setu Bhaban, Banani, Dhaka</p>
            <p>www.bba.gov.bd</p>
          </div>
          <div class="flex justify-between mt-5">
            <p>Office Memo no: 101.000.00.00.00.20</p>
            <p>Date: {{ $dateFns.format(items.date, 'dd/mm/yyyy') }}</p>
          </div>

          <p class="text-center font-bold mt-10 mb-10">
            <span v-if="items.financialprogress">SUBSTANTIAL</span> COMPLETION
            CERTIFICATE
          </p>

          <table class="table-auto table-cell">
            <tbody>
              <tr>
                <td width="1%">01</td>
                <td width="30%">Procuring Entity Details</td>
                <td>:</td>
                <td>
                  {{ items.ped }}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>&nbsp;(a)&nbsp; Division</td>
                <td>:</td>
                <td>{{ items.division }}</td>
              </tr>
              <tr>
                <td></td>
                <td>&nbsp;(b)&nbsp; Circle/Directorate</td>
                <td>:</td>
                <td>{{ items.cercle_directorate }}</td>
              </tr>
              <tr>
                <td></td>
                <td>&nbsp;(c)&nbsp; Zone/Region</td>
                <td>:</td>
                <td>{{ items.zone_region }}</td>
              </tr>
              <tr>
                <td></td>
                <td>&nbsp;(d)&nbsp; Others (<em>specify</em>)</td>
                <td>:</td>
                <td>
                  {{ items.others }}
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>
                  Name of
                  <span v-if="items.certificate_type === 'Works'">Works</span>
                  <span v-else-if="items.certificate_type === 'Goods'"
                    >Supply</span
                  >
                  <span v-else>Service</span>
                </td>
                <td>:</td>
                <td>{{ items.nameofworks }}</td>
              </tr>
              <tr></tr>
              <tr>
                <td>03</td>
                <td>Short Description</td>
                <td>:</td>
                <td>{{ items.shortdescription }}</td>
              </tr>

              <tr>
                <td>04</td>
                <td>
                  <span v-if="items.certificate_type === 'Goods'"
                    >Supplier's Legal Title</span
                  >
                  <span v-if="items.certificate_type === 'Works'"
                    >Contrator's Legal Title
                  </span>
                  <span v-else span>Contrator's Legal Title </span>
                </td>
                <td>:</td>
                <td>{{ items.ligal_title }}</td>
              </tr>
              <tr>
                <td>05</td>
                <td>Address</td>
                <td>:</td>
                <td>{{ items.contact_details }}</td>
              </tr>

              <tr>
                <td>06</td>
                <td>Reference to NOA/LOI with Date</td>
                <td>:</td>
                <td>{{ items.ref_with_noa_date }}</td>
              </tr>
              <tr>
                <td>07</td>
                <td>Original Contract Price</td>
                <td>:</td>
                <td>{{ items.original_contact_price }}</td>
              </tr>
              <tr>
                <td>08</td>
                <td>Revised Contact Price</td>
                <td>:</td>
                <td>
                  {{ items.revised_contact_price }}
                </td>
              </tr>
              <tr>
                <td rowspan="3">09</td>
                <td colspan="3" width="650">Original Contract Period</td>
              </tr>
              <tr>
                <td>(a) Date of Commencement</td>
                <td>:</td>
                <td>
                  {{
                    $dateFns.format(items.date_of_commencement, 'dd/mm/yyyy')
                  }}
                </td>
              </tr>
              <tr>
                <td>(b) Date of Completion</td>
                <td>:</td>
                <td>
                  {{ $dateFns.format(items.date_of_completion, 'dd/mm/yyyy') }}
                </td>
              </tr>
              <tr>
                <td rowspan="3">10</td>
                <td colspan="3" width="650">Actual Delivery Period</td>
              </tr>
              <tr>
                <td>(a) Date of Actual Commencement</td>
                <td>:</td>
                <td>
                  {{
                    $dateFns.format(
                      items.date_of_actual_commencement,
                      'dd/mm/yyyy'
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td>(b) Date of Actual Completion</td>
                <td>:</td>
                <td>
                  {{
                    $dateFns.format(
                      items.date_of_actual_completion,
                      'dd/mm/yyyy'
                    )
                  }}
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>Days/Months Delivery Period Extended</td>
                <td>:</td>
                <td>
                  {{ items.date_of_actual_period }}
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>Final Amount</td>
                <td>:</td>
                <td>{{ items.final_amount }}</td>
              </tr>
              <!--<tr>
                <td>13 &nbsp;</td>
                <td>Special Note (<em>if any</em>)</td>
                <td>:</td>
                <td></td>
              </tr> -->
              <tr v-if="!!items.physicalprogress">
                <td>13</td>
                <td>
                  Physical Progress in Percentage ({{
                    items.physicalprogresstilldate
                  }})
                </td>
                <td>:</td>
                <td>{{ items.physicalprogress }}</td>
              </tr>
              <tr v-if="!!items.physicalprogress">
                <td>14</td>
                <td>
                  Financial Progress ({{ items.financialprogresstilldate }})
                </td>
                <td>:</td>
                <td>
                  {{ items.financialprogress }}
                  <span>{{ items.financialprogress | toWords }}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="border-t-2 font-bold">
            It is a electronic document does not require signature
          </p>
          <div class="float-right">
            <div class="mb-10">
              <img :src="qrcode" alt="" />
              <!--<qrcode
                :background="background"
                :size="size"
                :cls="qrCls"
                :value="qrText"
              ></qrcode> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
const converter = require('number-to-words');
Vue.filter('toWords', function (value) {
  if (!value) {
    return '';
  }
  return converter.toWords(value);
});
export default {
  name: 'CertificateService',
  components: {},
  filters: {},
  props: {
    qrcode: String,
    items: null
  },
  data() {
    return {
      date: ''
    };
  },
  computed: {},
  methods: {
    dateFormat(dt) {
      if (dt == '0000-00-00') {
        return '';
      } else {
        // $dateFns.format(dt, 'dd/mm/yyyy');
      }
    }
  }
};
</script>
<style scoped>
table td {
  padding: 5px;
}
</style>
