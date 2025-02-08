<template>
    <div class="card">
        
        <Chart type="bar" :data="chartData" :options="chartOptions" style="height:30em;width:98%;"  />
    </div>
</template>

<script setup>
import { ref, onMounted, toRef,computed } from "vue";
import dayjs from "dayjs";
const props = defineProps(['data']);
const data = toRef(props, 'data');




onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    
    if(data?.value.length >0)
    {

        const month = data.value.map((item) => {
            //เอาปีด้วย
            return  convertToThaiMonth(dayjs(item._id).month() + 1) + " " + dayjs(item._id).year();
        });
        const total = data.value.map((item) => {
            return item.total;
        });

         return {
            labels: month,
            datasets: [
                {
                    label: 'ยอดขาย',
                    backgroundColor: documentStyle.getPropertyValue('--purple-500'),
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    data: total
                },
            ]
        };
    }



   
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

const convertToThaiMonth=(month)=>{
      // สร้างอาร์เรย์เดือนภาษาไทย
      const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
        'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน',
        'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];

      // คืนค่าเดือนภาษาไทย
      return thaiMonths[month - 1];
    }
</script>
