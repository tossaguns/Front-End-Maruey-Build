<template>
    <Sidebar v-model:visible="isLoading" header=" " position="bottom" style="height: 100%" :showCloseIcon="false" class="!bg-gradient-to-br from-[#745abd] to-[#9540ce]">
        <div class="text-white flex justify-center items-center mt-20">
            <div class="text-center flex flex-col items-center gap-3">
                <p class="text-3xl">กำลังทำรายการ</p>
                <div class="loader my-10"></div>
                <p class="text-xl opacity-50">กรุณารอซักครู่ . . .</p>
            </div>
        </div>    
    </Sidebar>
    <Toast></Toast>
    <ConfirmDialog></ConfirmDialog>
    <Dialog v-model:visible="visibleTerms" style="height: 100%" header=" " modal>
            <article class="text-sm">
                <strong>ข้อตกลงระหว่างสมาชิกของบริษัทมารวยด้วยกัน จำกัด กับสมาชิก มีรายละเอียดดังนี้</strong><br><br>
<p class="indent-8 text-balance">บริษัทมารวยด้วยกัน จำกัด ทำธุรกิจจำหน่ายสินค้าเพื่อสุขภาพ ฯลฯ ซึ่งต่อไปนี้จะเรียกว่า “บริษัท” สมาชิกบริษัทมารวยด้วยกัน จำกัด คือผู้สั่งซื้อสินค้าของทางบริษัทและสมัครเป็นสมาชิกเครือข่ายของบริษัท เพื่อช่วยกันจำหน่ายสินค้าหรือกระจายสินค้า และ สามารถสั่งซื้อสินค้าได้ในราคาที่บริษัทกำหนด และยังได้รับค่าตอบแทนที่ท่านแนะนำท่านอื่นมาซื้อสินค้าและเป็นสมาชิกอีกด้วย ซึ่งต่อไปนี้จะเรียกว่า “สมาชิก”</p><br>
1. ข้าพเจ้ามีอายุไม่น้อยกว่า 20 ปีบริบูรณ์ในวันที่ทำการสมัคร และมีเอกสารรับรองเพื่อใช้ในการสมัครสมาชิก หากข้อความดังกล่าวไม่เป็นจริง ข้าพเจ้ายินยอมให้ทางบริษัทฯ เพิกถอนสมาชิก และดำเนินคดีจนถึงที่สุด
<br>
2. ผู้ประกอบธุรกิจขายตรงที่จะจ่ายผลตอบแทนให้กับผู้จำหน่ายอิสระตามแผนการจ่ายผลตอบแทนที่ได้จดทะเบียนไว้ต่อนายทะเบียน ณ สำนักงานคณะกรรมการคุ้มครองผู้บริโภค สคบ. ตามที่ปรากฏในแผนการจ่ายผลตอบแทนของผู้ประกอบธุรกิจขายตรงที่มอบแก่ผู้จำหน่ายอิสระ
<br>
3. ผู้ประกอบธุรกิจขายตรงยินยอมที่จะรับซื้อคืนสินค้า วัสดุอุปกรณ์ส่งเสริมการขาย ชุดคู่มือ หรืออุปกรณ์ส่งเสริมธุรกิจจากผู้จำหน่ายอิสระ ในกรณีที่ผู้จำหน่ายอิสระประสงค์จะใช้สิทธิ์คืนสินค้าดังกล่าว โดยที่ผู้จำหน่ายอิสระจะต้องแสดงความจำนงใช้สิทธิ์ดังกล่าวต่อผู้ประกอบธุรกิจขายตรงภายในเวลา 30 นับแต่วันที่ได้สินค้า
<br>
4. เมื่อผู้จำหน่ายอิสระใช้สิทธิ์คืนสินค้า วัสดุอุปกรณ์ส่งเสริมการขาย ชุดคู่มือ หรืออุปกรณ์ส่งเสริมธุรกิจ ที่ได้ซื้อไปจากผู้ประกอบธุรกิจขายตรง ให้ผู้ประกอบธุรกิจขายตรงซื้อคืนตามราคาที่ผู้จำหน่ายอิสระได้จ่ายไป ภายใน 15 วัน นับตั้งแต่วันที่ผู้จำหน่ายอิสระได้ใช้สิทธิ์คืน แต่ในการใช้สิทธิ์ดังกล่าว กรณีที่สิ้นสุดระยะเวลาลงตามข้อ 3 , ผู้ประกอบธุรกิจขายตรงมีสิทธิ์หักค่าดำเนินการต่างๆได้ และมีสิทธิ์หักลบกลบหนี้ใดๆอันเกี่ยวกับสัญญาข้อ 1 ที่ผู้จำหน่ายอิสระต้องชำระได้
<br>
5. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า การสั่งซื้อสินค้าและสมัครเป็นสมาชิกเป็นการสั่งซื้อสินค้าล่วงหน้าตามเงื่อนไขและแผนการตลาดของทางบริษัท และจะได้รับสินค้าจากบริษัทภายใน 60 วัน นับจากวันที่สั่งซื้อสินค้าและสมัครเป็นสมาชิกสินค้าที่สั่งซื้อแล้ว และได้มีการคิดคำนวณผลตอบแทนไปแล้วนั้น จะไม่สามารถคืนได้ไม่ว่ากรณีใดๆ นอกจากนี้เงินค่าสินค้าที่ผู้สั่งซื้อสินค้าตามเงื่อนไขและแผนการตลาดของบริษัทฯ บริษัทฯไม่สามารถคืนให้แก่ลูกค้าได้เนื่องจากตามเงื่อนไขและแผนการตลาด มีค่าบริหารจัดการ ค่าการตลาด ค่าภาษีอากร และค่าใช้จ่ายอื่น ๆซึ่งมีการคำนวณผลประโยชน์ตอบแทนหรือโบนัสให้แก่สมาชิกจากผลประกอบการและผลกำไรจากการขายสินค้า เป็นระบบทั้งระบบ ดังนั้น จึงไม่สามารถคืนให้แก่ลูกค้าได้
<br>
6. ข้อผู้พันอื่นๆที่ผู้ประกอบธุรกิจขายตรงสามารถกำหนดได้ให้อยู่ภายใต้กรอบของกฎหมายว่าด้วยการขายตรงและตลาดแบบตรง และข้อผูกพันนั้นต้องไม่ขัดต่อความสงบเรียบร้อยของศีลธรรมอันดีของประชาชน
<br>
7. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า การสั่งซื้อสินค้าและการเป็นสมาชิกของข้าพเจ้ามิได้มีส่วนเกี่ยวข้องกับบริษัทในฐานะผู้ถือหุ้น, กรรมการ, ผู้บริหาร, พนักงาน, เจ้าหน้าที่, ลูกจ้าง,หรือตัวแทนบริษัทดังนั้น ข้าพเจ้าไม่มีอำนาจก่อให้เกิดนิติกรรมใดๆในนามบริษัทกับผู้อื่น ฯลฯ
<br>
8. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าการสั่งซื้อสินค้าและสมัครเป็นสมาชิกของข้าพเจ้า บริษัทมิได้เป็นผู้เชิญชวนหรือชักชวน แต่ข้าพเจ้าได้รับการแนะนำต่อ จากผู้ที่เคยใช้สินค้ามาก่อนและมีสถานภาพการเป็นสมาชิกของ บริษัทมารวยด้วยกัน จำกัดเท่านั้นและมีวัตถุประสงค์ในการร่วมกันบอกต่อเพื่อจำหน่ายสินค้าและกระจายสินค้าสู่ผู้บริโภคเพื่อให้เกิดผลกำไร
<br>
9. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าสมาชิก สิ้นสุดสถานภาพการเป็นสมาชิกลงเมื่อ
<br>
9.1 เสียชีวิตและไม่มีทายาทผู้สืบทอดมรดกเข้ามารับโอนสถานภาพสมาชิกภายในกำหนด 1 ปีนับตั้งแต่วันที่สมาชิกเสียชีวิต
<br>
9.2 ขาดการรักษาสถานะภาพสมาชิกนานติดต่อกัน90วัน
<br>
9.3 ถูกเพิกถอนจากการเป็นสมาชิก
<br>
10. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า กรณีที่สถานภาพของสมาชิก ได้สิ้นสุดลงด้วยการเหตุใดก็ตามสมาชิกผู้ที่สถานภาพได้สิ้นสุดลงไปแล้วนั้น สามารถสมัครเป็นสมาชิกภายหลังจาก 6 เดือน (180วัน) นับตั้งแต่วันที่สถานภาพได้สิ้นสุดลง
<br>
11. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า กรณีที่สมาชิก ไม่อาจดำเนินการโอนสถานภาพการเป็นสมาชิกด้วยตนเองเพราะเหตุใดเหตุหนึ่งตามที่ระบุไว้ดังต่อไปนี้บริษัทจะโอนสถานภาพการเป็นสมาชิกให้แก่ผู้สืบทอดมรดกตามที่ระบุไว้ในใบสมัคร
<br>
11.1 กรณีสมาชิกเสียชีวิต
<br>
11.2 เมื่อแพทย์ลงความเห็นว่าวิกลจริต
<br>
11.3 เมื่อศาลมีคำสั่งให้เป็นคนไร้ความสามารถหรือเสมือนไร้ความสามารถ
<br>
12. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ผู้สั่งซื้อสินค้าและสมาชิกผู้ร่วมธุรกิจอิสระ ต้องปฏิบัติตนให้เหมาะสมกับการมีอาชีพต่อไปนี้
<br>
12.1 ให้บริการที่ดีอย่างสม่ำเสมอ
<br>
12.2 มีความซื่อสัตย์ สุจริต จริงใจต่อลูกค้า บริษัทและเพื่อนร่วมอาชีพโดยจะไม่แย่งสายงานจากเพื่อนร่วมอาชีพ ไม่ทำให้ลูกค้าบริษัทฯ และเพื่อนร่วมอาชีพสูญเสียผลประโยชน์หากสมาชิกประพฤติผิดเกี่ยวกับการแย่งสายงาน หรือลูกค้า ทางบริษัทจะตัดหรือเพิกถอนการเป็นสมาชิกออกจากบริษัททันที โดยไม่ต้องจ่ายเงินคืนหรือผลประโยชน์ใดๆ ให้แก่สมาชิกที่ประพฤติผิดนั้น
<br>
12.3 ไม่ลดหรือเสนอที่จะลดผลประโยชน์เพื่อจูงใจลูกค้า
<br>
12.4 ไม่กล่าวเปรียบเทียบให้ร้ายหรือพูดลบที่อาจก่อให้เกิดความเสียหายต่อบริษัทฯ ผู้บริหารและเพื่อนร่วมอาชีพอย่างไม่ยุติธรรมทางตรงและทางอ้อม
<br>
12.5 หมั่นศึกษาหาความรู้ในวิชาชีพเพื่อเพิ่มเติมอย่างสม่ำเสมอหมั่นเข้าฝึกอบรมหรือเข้าประชุมตามที่ทางบริษัทจัดขึ้นทุกครั้ง
<br>
12.6 พัฒนาบุคลิก การแต่งกาย ตรงต่อเวลานัด ให้ความร่วมมือในกิจกรรมกับบริษัท เป็นอย่างดี
<br>
12.7 ประพฤติตนอยู่ในศีลธรรม ประเพณีอันดีงาม ทั้งดำรงไว้ซึ่งเกียรติ และศักดิ์ศรีแห่งคุณธรรม
<br>
13. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าบริษัทตกลงที่จะจ่ายผลตอบแทนให้กับผู้สั่งซื้อสินค้าและสมาชิกตามผลประกอบการและแผนการตลาดหรือจากผลกำไรจากการจำหน่ายสินค้าของบริษัท
<br>
14. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่านอกเหนือจากแผนงานหรือนโยบายของบริษัท และมิได้เกิดจากความยินยอมหรือรับรองจากบริษัทหรือการกระทำใดๆ ที่กล่าวอ้างบริษัท โดยก่อให้เกิดความเสียหายถือเป็นความรับผิดชอบเฉพาะตัวของข้าพเจ้าแต่เพียงผู้เดียวไม่เกี่ยวข้องกับบริษัท บริษัทจะไม่รับผิดชอบใดๆ และข้าพเจ้ายินยอมรับผิดชอบเป็นส่วนตัวในทางกฎหมาย ทั้งในทางแพ่งและทางอาญา
<br>
15. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ข้าพเจ้าจะช่วยบริษัทจำหน่ายสินค้าโดยการบอกต่อ และจะดูแลให้บริการลูกค้าที่ข้าพเจ้าแนะนำด้วยค่าใช้จ่ายของข้าพเจ้าเอง
<br>
16. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าทางบริษัทห้ามสมาชิกทอดทิ้งลูกค้าและสายงานโดยจะต้องให้บริการที่ดีและมีความสม่ำเสมอแก่ลูกค้าเมื่อลูกค้าสมัครเข้าเป็นสมาชิก ในสายงานของตนก็ต้องให้คำแนะนำถึงวิธีดำเนินธุรกิจ ของบริษัทมารวยด้วยกัน จำกัด ที่ถูกต้องโดยให้ช่วยกันขายสินค้า ของบริษัท บอกต่อคุณภาพของสินค้า ของบริษัทให้กำลังใจ ให้ข้อมูลและ แนะนำเข้าสู่แผนงานการฝึกอบรมต่างๆ ตามที่บริษัทได้จัดเสนอให้อย่างถูกต้องสม่ำเสมอ
<br>
17. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าสมาชิกไม่มีสิทธิเรียกร้อง เงินเดือน, สวัสดิการ, เงินช่วยเหลือและ/หรือ รายได้อื่นใดจากบริษัท ยกเว้นรายได้, ผลตอบแทนและสวัสดิการเฉพาะส่วนที่สมาชิกพึงได้รับจากผลประกอบการหรือผลกำไรจากการขายสินค้า ของบริษัท ตามที่ระบุไว้ในแผนงานของบริษัท
<br>
18. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า หากสมาชิกกระทำการใดๆที่ก่อให้เกิดหนี้สินกับบริษัทไม่ว่าด้วยเหตุใด และจำนวนเงินเท่าใดบริษัทมีสิทธินำเอาผลประโยชน์ของสมาชิกมาหักหนี้นั้นๆได้
<br>
19. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าจะไม่ยอมรับรูปแบบการทุจริตใดๆที่มาจากบุคคลอื่นในการที่จะสนับสนุนการหาสมาชิกใหม่หรือยืนยันรับสิทธิ์ของทางบริษัทที่จะส่งผลต่อสถานภาพการเป็นผู้จำหน่ายสินค้า ของบริษัท ของข้าพเจ้าไม่ว่าจะเป็นในลักษณะใดก็ตาม
<br>
20. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า การติดต่อกับหน่วยงานราชการใดหรือองค์กรเอกชนใดเพื่อเป็นการดำเนินธุรกิจจะต้องได้รับอนุมัติจากบริษัทเป็นลายลักษณ์อักษร
<br>
21. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ผลิตภัณฑ์ ของบริษัท อุปกรณ์ส่งเสริมการขาย สื่อสิ่งพิมพ์เครื่องหมายการค้า ชื่อ และอุปกรณ์ต่างๆที่เป็นกรรมสิทธิ์ของบริษัทฯ ห้ามมิให้นำไปใช้ ลอกเลียนแบบหรือทำซ้ำ หรือดัดแปลง เพื่อการใดๆทั้งสิ้น
<br>
22. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ห้ามสมาชิกใช้สิทธิใดๆ เหนือเครื่องหมายการค้า เครื่องหมายบริการ โลโก้ รูปรอยประดิษฐ์ รวมตลอดถึงทรัพย์สินทางปัญญาทั้งหลายทั้งปวงของบริษัทหากไม่ได้รับความยินยอมเป็นหนังสือจากกรรมการหรือตัวแทนผู้มีอำนาจของบริษัทฯ
<br>
23. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า จะนำเสนอผลิตภัณฑ์ ของบริษัท แผนงานการดำเนินธุรกิจและการฝึกอบรมต่างๆ โดยจะไม่โฆษณาชักชวน โดยกล่าวคำอวดอ้างหรือคำยืนยันที่ไม่เป็นจริงนอกเหนือจากที่บริษัทได้ประกาศรับรองไว้ในเอกสารหรือแผนงานของบริษัท
<br>
24. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าห้ามสมาชิกบังคับซื้อสินค้าตลอดจนถึงการกักตุนสินค้าหรือบังคับเกินความจำเป็นในการใช้สินค้าหรือการขยายธุรกิจ
<br>
25. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ห้ามสมาชิกจำหน่าย หรือ จัดวางสินค้าของบริษัทฯ ในสถานที่ใด ๆ เช่นขายปลีกร้านค้าสหกรณ์ ตลาดขนาดเล็กซุปเปอร์มาร์เก็ต ห้างสรรพสินค้า หรือสถานที่อื่น หรือ โฆษณาเพื่อเสนอขายสินค้าดังกล่าวทางสื่อใดๆโดยไม่ได้รับอนุมัติจากบริษัทเป็นลายลักษณ์อักษร โดยเด็ดขาดเพื่อไม่ก่อให้เกิดการได้เปรียบเหนือสมาชิกอื่นๆ
<br>
26. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ห้ามสมาชิก จำหน่ายหรือเสนอผลิตภัณฑ์ ของบริษัท แก่สายงานอื่น รวมทั้งห้ามชักชวนให้สมาชิกผู้อื่นเปลี่ยนสายงานโดยเด็ดขาดเพื่อไม่ให้เกิดความสับสน แตกความสามัคคี และส่งผลกระทบต่อการบริหารจัดการการตลาดของสมาชิกในสายงานอื่นๆ
<br>
27. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า จะทำความเข้าใจที่ถูกต้องเกี่ยวกับบริษัท ไม่บิดเบือนข้อมูลอวดอ้างหรือนำเสนอข้อมูลที่อาจก่อให้เกิดความเข้าใจผิดเกี่ยวกับการดำเนินงาน ผลิตภัณฑ์หรือระบบตอบแทนของบริษัท โดยจะต้องให้ข้อเท็จจริงแก่ลูกค้าอย่างชัดเจนว่า ธุรกิจ บริษัทมารวยด้วยกัน จำกัด จำกัด คือโอกาสที่จะสร้างผลงานการขายสินค้า ของบริษัท ที่นำมาซึ่งรายได้จากระบบแผนการตลาด โดนคิดคำนวณจากยอดซื้อ ยอดขายทั้งส่วนตัวและทีมงานมิใช่นำมาจากยอดการหาจำนวนคนเข้าสู่เครือข่ายสายงาน
<br>
28. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า จะไม่จำหน่ายผลิตภัณฑ์ของบริษัท ของบริษัทต่ำกว่าราคาสมาชิก และสมาชิกบริษัทไม่มีสิทธิเป็นผู้กำกับดูแล กำหนดราคานอกเหนือจากราคาของบริษัท เพื่อให้สอดคล้องกับความต้องการของตลาดเพื่อให้เกิดประโยชน์สูงสุดแก่สมาชิกอื่น
<br>
29. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าห้ามสมาชิกจำหน่ายหรือเสนอบริการอื่นที่ไม่ใช่ผลิตภัณฑ์ของบริษัทอันเป็นคู่แข่งของสินค้าของบริษัทโดยเด็ดขาด
<br>
30. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า หากเกิดกรณีพิพาทขึ้นระหว่างสมาชิกกับสมาชิก หรือสมาชิกกับลูกค้า หรือสมาชิกกับบริษัท ก็ตามให้ยึดเอาคำตัดสินของกรรมการบริษัท เป็นที่สุด
<br>
31. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าหากมีกรณีที่ รายได้ และ/หรือผลตอบแทนใดๆที่บริษัทจ่ายให้เกินจากสิทธิที่ข้าพเจ้าพึงได้รับข้าพเจ้าจะต้องคืนให้บริษัททันทีที่ข้าพเจ้าทราบหรือได้รับแจ้งจากบริษัทโดยชำระคืนเป็นเงินสดหรือยินยอมให้บริษัทหักจากรายได้ตามที่ได้เกินมา
<br>
32. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ข้าพเจ้าขอมอบอำนาจให้บริษัทเก็บ และถ่ายทอดข้อมูล(ส่วนตัวข้าพเจ้า, ข้อมูลเกี่ยวกับลูกค้า, ข้อมูลเกี่ยวกับการดำเนินธุรกิจขายตรงและข้อมูลอื่นๆที่เกี่ยวข้องทั้งหมด) ได้โดยวิธีการทางอิเล็กทรอนิกส์
<br>
33. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า ข้าพเจ้าเต็มใจที่จะยอมรับกฎระเบียบ ข้อบังคับต่างๆและจะปฏิบัติตามกฎหมาย ซึ่งรวมถึงพระราชบัญญัติการขายตรงและตลาดแบบขายตรงพ.ศ.2545ทั้งหมดด้วย
<br>
34. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าการกระทำของสมาชิก อันจะนำไปสู่มาตรการลงโทษ มีดังนี้
<br>
34.1 สมาชิกฝ่าฝืนกฎระเบียบข้อบังคับ จรรยาบรรณของบริษัท
<br>
34.2 สมาชิกได้กระทำการอันเป็นการเสื่อมเสียต่อบริษัท และผลิตภัณฑ์ของบริษัท
<br>
34.3 สมาชิก กระทำการอันเป็นเหตุให้บริษัท เสียหายในการประกอบกิจการ
<br>
34.4 สมาชิก ได้แจ้งหรือแสดงข้อมูลเกี่ยวกับสมาชิก หรือข้อมูลเกี่ยวกับบริษัทไม่ตรงกับข้อเท็จจริง
<br>
35. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่ามาตรการ การลงโทษของบริษัทเรียงลำดับตามความรุนแรงของการกระทำดังต่อไปนี้
<br>
35.1 ตักเตือนเป็นลายลักษณ์อักษร
<br>
35.2 งดรับสิทธิประโยชน์ต่างๆ อันพึงจะได้ในรอบการจ่ายนั้นๆ
<br>
35.3 เพิกถอนสถานภาพออกจากการเป็นสมาชิก
<br>
36. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่า หากข้าพเจ้าประพฤติผิดไปจากเงื่อนไข, ข้อตกลง ตลอดจนแผนงานและกติกาที่บริษัทกำหนด รวมถึงจรรยาบรรณ กฎและระเบียบของกฎหมายขายตรงบริษัทมีสิทธิในการพิจารณาบอกเลิกการเป็นสมาชิก รวมถึงการตัด, ลด,งด,ระงับและหรือยกเลิกการจ่ายผลประโยชน์ของข้าพเจ้า ทั้งในส่วนที่เกิดขึ้นและจะเกิดขึ้นต่อไปในอนาคตโดยข้าพเจ้าไม่มีสิทธิเรียกร้องใดๆ จากบริษัททั้งสิ้น
<br>
37. ข้าพเจ้าตกลงยินยอมและเข้าใจดีว่าบริษัทสงวนสิทธิในการพิจารณาเปลี่ยนแปลง, แก้ไข และปรับปรุงเงื่อนไข หรือข้อกำหนดต่างๆ ตามที่บริษัทเห็นสมควร โดยไม่ต้องแจ้งให้ทราบล่วงหน้าทั้งนี้บริษัทจะทำการแจ้งเป็นลายลักษณ์อักษรให้ทราบภายหลัง
<br>
38. ข้าพเจ้าได้อ่านและเข้าใจข้อความทั้งหมดแล้วและยอมรับเงื่อนไขต่าง ๆ ตามที่บริษัทกำหนดทุกประการด้วยความสมัครใจของข้าพเจ้าเอง
<br><br>
<strong class="text-sm">***หากสมาชิกท่านใดที่มีอายุน้อยกว่า 20 ปีต้องมีเอกสารรับรองจากทางผู้ปกครองเพื่อใช้ในการสมัครสมาชิก มิฉะนั้นหากทางบริษัททราบภายหลังรหัสดังกล่าวจะถือว่าเป็นโมฆะทันที</strong>
            </article>
        <div class="my-3 border-t pt-3 flex">
            <input id="agree" type="checkbox" class="border border-gray-300 p-3 focus:ring-1 rounded" v-model="agree" >
            <label class="text-sm ml-2" for="agree">ฉันได้อ่านและยอมรับเงื่อนไขข้อกำหนดดังกล่าว</label>
        </div>
        <button @click="sendRegister" :disabled="!agree" class="w-full mb-5 text-center py-1 rounded" :class="agree ? 'bg-purple-500 text-white' : 'bg-gray-300'">ยอมรับข้อตกลง และสมัครสมาชิก</button>
    </Dialog>
    <div class="bg-slate-100 w-full min-h-[calc(100vh-4rem)] pt-10 flex flex-col items-center">
        <div class="bg-white rounded-xl w-full max-w-3xl h-full px-5 pb-10 mb-[10rem]">
            <button class="absolute top-14 left-3 pi pi-caret-left text-3xl text-gray-400" @click="$router.push('/customer/customerview')"></button>
            <p class="py-5 text-xl font-bold text-center">สมัครสมาชิก</p>
            <div class="py-3 border-t w-full mt-3">
                <p>รหัสผู้แนะนำ</p>
                <p class="border p-2 rounded bg-slate-200">{{ from.name }} ( {{ from.user_name }} )</p>
            </div>
            <div class="w-full mt-5">
                <div class="p-2 bg-purple-200 rounded-xl">
                    <p>ข้อมูลผู้สมัคร</p>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <p>ขนาดธุรกิจ</p>
                        <Dropdown class="border w-full" v-model="user.qualification_id" :options="qualification_list" optionLabel="name" optionValue="name" placeholder="เลือกขนาดธุรกิจ" @change="calUserPV" />
                    </div>
                    <div>
                        <p>PV</p>
                        <p class="border p-2 rounded bg-slate-200">{{ user.pv || 0 }}</p>
                    </div>
                    <div>
                        <p>คำนำหน้า</p>
                        <Dropdown class="border w-full" v-model="user.prefix_name" :options="['นาย', 'นาง', 'นางสาว']" placeholder="เลือกคำนำหน้า" />
                    </div>
                    <div>
                        <p>เพศ</p>
                        <Dropdown class="border w-full" v-model="user.gender" :options="['ชาย', 'หญิง', 'ไม่ระบุ']" placeholder="เลือกเพศ" />
                    </div>
                    <div>
                        <label for="first_name">ชื่อ</label>
                        <input type="text" id="first_name" v-model="user.first_name" class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="last_name">นามสกุล</label>
                        <input type="text" id="last_name" v-model="user.last_name" class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="col-span-2">
                        <label for="business_name">ชื่อทางธุรกิจ</label>
                        <input type="text" id="business_name" v-model="user.business_name" class="border border-gray-300 p-2 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="col-span-2">
                        <label for="birth_date">วันเกิด</label>
                        <div id="birth_date" class="flex justify-between gap-2">
                            <Dropdown class="border w-full" v-model="user.birth_day" :options="days" placeholder="วัน" />
                            <Dropdown class="border w-full" v-model="user.birth_month" :options="months" optionLabel="name" optionValue="value" placeholder="เดือน" />
                            <Dropdown class="border w-full" v-model="user.birth_year" :options="years()" optionLabel="name" optionValue="value" placeholder="ปี" />
                        </div>
                    </div>
                    <div>
                        <p>สัญชาติ</p>
                        <Dropdown class="border w-full" v-model="user.nation_id" :options="regions" placeholder="เลือกสัญชาติ" />
                    </div>
                    <div class="relative">
                        <label for="id_number">เลขบัตรประชาชน</label>
                        <input minlength="13" maxlength="13" type="text" id="id_number" v-model="user.id_card" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                        <small v-if="user.id_card?.length != 13" class=" text-red-500">*กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก</small>
                    </div>
                    <div>
                        <label for="phone">โทรศัพท์</label>
                        <input minlength="10" maxlength="10" type="text" id="phone" v-model="user.phone" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                        <small v-if="user.phone?.length != 10" class=" text-red-500">*กรุณากรอกเบอร์โทรให้ครบ 10 หลัก</small>
                    </div>
                    <div>
                        <label for="email">E-mail <span class="text-gray-400 text-xs font-normal">(ไม่จำเป็นต้องกรอก)</span></label>
                        <input type="text" id="email" v-model="user.email" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="line_id" class="truncate">Line ID <span class="text-gray-400 text-xs font-normal">(ไม่จำเป็นต้องกรอก)</span></label>
                        <input type="text" id="line_id" v-model="user.line_id" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="facebook" class="truncate">Facebook <span class="text-gray-400 text-xs font-normal">(ไม่จำเป็นต้องกรอก)</span></label>
                        <input type="text" id="facebook" v-model="user.facebook" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                </div>
            </div>
            <div class="w-full mt-8">
                <div class="p-2 bg-purple-200 rounded-xl">
                    <p>ที่อยู่ตามบัตรประชาชน</p>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label for="address">ที่อยู่</label>
                        <input type="text" id="address" v-model="address.address" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="moo">หมู่ที่</label>
                        <input type="text" id="moo" v-model="address.moo" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="soi">ซอย</label>
                        <input type="text" id="soi" v-model="address.soi" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="road">ถนน</label>
                        <input type="text" id="road" v-model="address.road" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="province">จังหวัด</label>
                        <AutoComplete inputId="province" dropdownClass="bg-purple-200" inputClass="border" v-model="selected_province" optionLabel="name_th" dropdown :suggestions="provinces" @complete="searchProvince" />
                    </div>
                    <div>
                        <label for="district">เขต/อำเภอ</label>
                        <AutoComplete :disabled="!selected_province" inputId="district" dropdownClass="bg-purple-200" inputClass="border" v-model="selected_district" optionLabel="name_th" dropdown :suggestions="districts" @complete="searchDistrict" />
                    </div>
                    <div>
                        <label for="subdistrict">แขวง/ตำบล</label>
                        <AutoComplete :disabled="!selected_district" inputId="subdistrict" dropdownClass="bg-purple-200" inputClass="border" v-model="selected_subdistrict" optionLabel="name_th" dropdown :suggestions="subdistricts" @complete="searchSubDistrict" />
                    </div>
                    <div>
                        <label for="zipcode">รหัสไปรษณีย์</label>
                        <input disabled type="text" id="zipcode" v-model="address.zipcode" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="">
                        <label for="address_phone">เบอร์มือถือ</label>
                        <input type="text" id="address_phone" v-model="address.phone" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="col-span-2">
                        <label for="upload_idcard">อัพโหลดรูปบัตรประชาชน <span v-if="upload.id_card" class="ml-2 text-white bg-green-500 rounded px-1">เลือกไฟล์แล้ว</span></label>
                        <input @change="handleUploadIdCard" type="file" id="upload_idcard" :class="upload.id_card ? 'border-green-500' : ''" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                </div>
            </div>
            <div class="w-full mt-8">
                <div class="p-2 bg-purple-200 rounded-xl flex items-center gap-5">
                    <p>ที่อยู่จัดส่ง</p>
                    <div class="flex items-center gap-2">
                        <Checkbox v-model="useLikeAddress" :binary="true" />
                        <label for="useLikeAddress" class="text-purple-700">ใช้ที่อยู่เดียวกับที่อยู่ตามบัตรประชาชน</label>
                    </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label for="address">ที่อยู่</label>
                        <input type="text" id="address" v-model="delivery_address.address" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="moo">หมู่ที่</label>
                        <input type="text" id="moo" v-model="delivery_address.moo" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="soi">ซอย</label>
                        <input type="text" id="soi" v-model="delivery_address.soi" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="road">ถนน</label>
                        <input type="text" id="road" v-model="delivery_address.road" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="province">จังหวัด</label>
                        <AutoComplete inputId="province" dropdownClass="bg-purple-200" inputClass="border" v-model="d_selected_province" optionLabel="name_th" dropdown :suggestions="d_provinces" @complete="dsearchProvince" />
                    </div>
                    <div>
                        <label for="district">เขต/อำเภอ</label>
                        <AutoComplete :disabled="!d_selected_province || useLikeAddress" inputId="district" dropdownClass="bg-purple-200" inputClass="border" v-model="d_selected_district" optionLabel="name_th" dropdown :suggestions="d_districts" @complete="dsearchDistrict" />
                    </div>
                    <div>
                        <label for="subdistrict">แขวง/ตำบล</label>
                        <AutoComplete :disabled="!d_selected_district || useLikeAddress" inputId="subdistrict" dropdownClass="bg-purple-200" inputClass="border" v-model="d_selected_subdistrict" optionLabel="name_th" dropdown :suggestions="d_subdistricts" @complete="dsearchSubDistrict" />
                    </div>
                    <div>
                        <label for="zipcode">รหัสไปรษณีย์</label>
                        <input disabled type="text" id="zipcode" v-model="delivery_address.zipcode" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="">
                        <label for="address_phone">เบอร์มือถือ</label>
                        <input type="text" id="address_phone" v-model="delivery_address.phone" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                </div>
            </div>
            <div class="w-full mt-5">
                <div class="p-2 bg-purple-200 rounded-xl">
                    <p>ข้อมูลบัญชีธนาคารเพื่อรับรายได้</p>
                    <div class="flex items-center gap-3">
                        <span class="pi pi-exclamation-triangle text-purple-700"></span>
                        <p class="text-sm text-purple-700">สมาชิกจะใส่หรือไม่ใส่ก็ได้ หากไม่ได้ใส่จะมีผลกับการโอนเงินให้สมาชิก</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <p>ธนาคาร</p>
                        <Dropdown inputId="bank_provider" optionLabel="name" optionValue="id" class="border w-full" v-model="bank.id" :options="bankProviders" placeholder="เลือกธนาคาร" />
                    </div>
                    <div>
                        <label for="bank_branch">สาขา</label>
                        <input type="text" id="bank_branch" v-model="bank.branch" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="bank_number">เลขที่บัญชี</label>
                        <input type="text" id="bank_number" v-model="bank.number" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="bank_holder">ชื่อบัญชี</label>
                        <input type="text" id="bank_holder" v-model="bank.account_name" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div class="col-span-2">
                        <label for="upload_bookbank">อัพโหลดรูปหน้าบัญชีธนาคาร <span v-if="upload.bookbank" class="ml-2 text-white bg-green-500 rounded px-1">เลือกไฟล์แล้ว</span></label>
                        <input @change="handleUploadBookbank" type="file" id="upload_bookbank" :class="upload.bookbank ? 'border-green-500' : ''" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                </div>
            </div>
            <div class="w-full mt-5">
                <div class="p-2 bg-purple-200 rounded-xl">
                    <p>ผู้รับผลประโยชน์</p>
                    <div class="flex items-center gap-3">
                        <span class="pi pi-exclamation-triangle text-purple-700"></span>
                        <p class="text-sm text-purple-700">ถ้าไม่กรอกถือว่าผู้รับผลประโยชน์จะเป็นผู้รับผลประโยชน์ตามกฎหมาย</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                        <label for="valuable_firstname">ชื่อ</label>
                        <input type="text" id="valuable_firstname" v-model="valuable.first_name" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="valuable_lastname">นามสกุล</label>
                        <input type="text" id="valuable_lastname" v-model="valuable.last_name" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                    <div>
                        <label for="valuable_relation">เกี่ยวข้องเป็น</label>
                        <input type="text" id="valuable_relation" v-model="valuable.relation" class="border border-gray-300 p-3 focus:ring-1 rounded w-full text-sm leading-4 placeholder-gray-600 text-gray-600 focus:outline-none" >
                    </div>
                </div>
            </div>
            <div class="w-full mt-10 border-t pt-10 flex justify-center">
                <button @click="sendRegisterHandler" class="font-semibold leading-none text-white py-4 px-10 bg-[#8B2FC9] rounded-lg hover:bg-[#E178C5] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B2FC9] focus:outline-none">บันทึกข้อมูล</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

onMounted(() => {
    getMyData()
    //fetchQualifications()
    fetchProvinces()
    fetchDistricts()
    fetchSubDistricts()
})

const agree = ref(false);
const store = useStore();
const router = useRouter();
const isLoading = ref(false);
const visibleTerms = ref(false);
const upload = ref({})
const bank = ref({})
const valuable = ref({})

const handleUploadIdCard = (e) => {
    upload.value.id_card = e.target.files[0]
}

const handleUploadBookbank = (e) => {
    upload.value.bookbank = e.target.files[0]
}

const from = ref({});
const getMyData = () => {
    from.value = store.getters.me;
}
const address = ref({});
const user = ref({
    nation_id: "ไทย",
});
const qualification_list = ref([
    {
        id: 1,
        name: "MB",
        pv: 20
    },
    {
        id: 2,
        name: "MO",
        pv: 400
    },
    {
        id: 3,
        name: "VIP",
        pv: 800
    },
    {
        id: 4,
        name: "VVIP",
        pv: 1200
    }
])

const calUserPV = () => {
    if (user.value.qualification_id) {
        user.value.pv = qualification_list.value.find(x => x.name === user.value.qualification_id)?.pv
    } else {
        user.value.pv = 0
    }
}

const days = ref([
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
])

const months = ref([
    {
        name: "มกราคม",
        value: 1
    },
    {
        name: "กุมภาพันธ์",
        value: 2
    },
    {
        name: "มีนาคม",
        value: 3
    },
    {
        name: "เมษายน",
        value: 4
    },
    {
        name: "พฤษภาคม",
        value: 5
    },
    {
        name: "มิถุนายน",
        value: 6
    },
    {
        name: "กรกฎาคม",
        value: 7
    },
    {
        name: "สิงหาคม",
        value: 8
    },
    {
        name: "กันยายน",
        value: 9
    },
    {
        name: "ตุลาคม",
        value: 10
    },
    {
        name: "พฤศจิกายน",
        value: 11
    },
    {
        name: "ธันวาคม",
        value: 12
    }
])

const years = () => {
    const currentYear = new Date().getFullYear() - 18; // Convert to Thai year
    const years = [];
    for (let i = currentYear; i >= 1947; i--) {
        years.push({
            name: i + 543,
            value: i
        });
    }
    return years;
}

const regions = ref([
    "ไทย",
    "ลาว",
    "พม่า",
    "กัมพูชา",
    "เวียดนาม",
    "มาเลเซีย",
    "จีน",
    "สิงคโปร์",
    "บรูไน",
    "อินโดนีเซีย",
    "ฟิลิปปินส์",
    "อเมริกา",
    "ออสเตรเรีย",
    "เยอรมัน",
    "เบลเยี่ยม",
])

const delivery_address = ref({});
const useLikeAddress = ref(false)
watch(useLikeAddress, () => {
    if (useLikeAddress.value) {
        delivery_address.value = address.value
        d_selected_province.value = selected_province.value
        d_selected_district.value = selected_district.value
        d_selected_subdistrict.value = selected_subdistrict.value
    } else {
        delivery_address.value = {}
        d_selected_province.value = null
        d_selected_district.value = null
        d_selected_subdistrict.value = null
    }
})

// province
const selected_province = ref(null);
const d_selected_province = ref(null);
const provinces = ref([]);
const d_provinces = ref([]);
const provinceRef = ref([]);
const searchProvince = (event) => {
    let _items = [...provinceRef.value];
    provinces.value = event.query ? [..._items].filter((item) => item.name_th.includes(selected_province.value)) : [..._items].map((item) => item);
}
const dsearchProvince = (event) => {
    let _items = [...provinceRef.value];
    d_provinces.value = event.query ? [..._items].filter((item) => item.name_th.includes(d_selected_province.value)) : [..._items].map((item) => item);
}
const fetchProvinces = async () => {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/dataset_changwat`);
    //console.log(data)
    if (data.status === 'success') {
        provinceRef.value = data.data.filter(x => x.status === 0)
    }
}
watch(selected_province, () => {
    if (selected_province.value) {
        selected_district.value = null
        selected_subdistrict.value = null
    }
})

// district
const selected_district = ref(null);
const d_selected_district = ref(null);
const districts = ref([]);
const d_districts = ref([]);
const districtRef = ref([]);
const districtOptions = computed(() => {
    return selected_province.value ? districtRef.value.filter(x => x.changwat_id+'' === selected_province.value.id+'') : []
});
const d_districtOptions = computed(() => {
    return d_selected_province.value ? districtRef.value.filter(x => x.changwat_id+'' === d_selected_province.value.id+'') : []
});
const searchDistrict = (event) => {
    let _items = [...districtOptions.value];
    districts.value = event.query ? [..._items].filter((item) => item.name_th.includes(selected_district.value)) : [..._items].map((item) => item);
}
const dsearchDistrict = (event) => {
    let _items = [...d_districtOptions.value];
    d_districts.value = event.query ? [..._items].filter((item) => item.name_th.includes(d_selected_district.value)) : [..._items].map((item) => item);
}
const fetchDistricts = async () => {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/dataset_amphuress`);
    //console.log(data)
    if (data.status === 'success') {
        districtRef.value = data.data.filter(x => x.status === 0)
    }
}
watch(selected_district, () => {
    if (selected_district.value) {
        selected_subdistrict.value = null
    }
})

// subdistrict
const selected_subdistrict = ref(null);
const d_selected_subdistrict = ref(null);
const subdistricts = ref([]);
const d_subdistricts = ref([]);
const subdistrictRef = ref([]);
const subdistrictOptions = computed(() => {
    if (!selected_district.value) return [];
    return subdistrictRef.value.filter(x => x.amphure_id == selected_district.value.id)
});
const d_subdistrictOptions = computed(() => {
    if (!d_selected_district.value) return [];
    return subdistrictRef.value.filter(x => x.amphure_id == d_selected_district.value.id)
});
const searchSubDistrict = (event) => {
    let _items = [...subdistrictOptions.value];
    subdistricts.value = event.query ? [..._items].filter((item) => item.name_th.includes(selected_subdistrict.value)) : [..._items].map((item) => item);
}

const dsearchSubDistrict = (event) => {
    let _items = [...d_subdistrictOptions.value];
    d_subdistricts.value = event.query ? [..._items].filter((item) => item.name_th.includes(d_selected_subdistrict.value)) : [..._items].map((item) => item);
}
const fetchSubDistricts = async () => {
    const { data } = await axios.get(`${process.env.VUE_APP_MLM}/dataset_tambon`);
    //console.log(data)
    if (data.status === 'success') {
        subdistrictRef.value = data.data.filter(x => x.status === 0)
    }
}

watch(selected_subdistrict, () => {
    if (selected_subdistrict.value) {
        address.value.zipcode = selected_subdistrict.value.zip_code
    }
})
watch(d_selected_subdistrict, () => {
    if (d_selected_subdistrict.value) {
        delivery_address.value.zipcode = d_selected_subdistrict.value.zip_code
    }
})

const bankProviders = ref([
    {
        id: 1,
        name: 'กรุงเทพ (BANGKOK)'
    },
    {
        id: 4,
        name: 'กสิกรไทย (KASIKORN)'
    },
    {
        id: 2,
        name: 'กรุงไทย (KRUNG THAI)'
    },
    {
        id: 7,
        name: 'ไทยพาณิชย์ (SIAM COMMERCIAL)'
    },
    {
        id: 3,
        name: 'ธนาคารกรุงศรีอยุธยา (AYUDHAYA)'
    },
    {
        id: 12,
        name: 'ธนาคารทหารไทยธนชาต'
    },
    {
        id: 8,
        name: 'ธกส'
    },
    {
        id: 9,
        name: 'ออมสิน (THE GOVERNMENT SAVING)'
    },
    {
        id: 10,
        name: 'ธอส'
    },
    {
        id: 11,
        name: 'อิสรามแห่งประเทศไทย (ISLAMIC OF THAILAND)'
    },
    {
        id: 5,
        name: 'ซีไอเอ็มบี ไทย (CIMB THAI)'
    }
])

const checkValidation = () => {
    if (!user.value.qualification_id) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกตำแหน่งทางธุรกิจ',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!user.value.first_name) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกชื่อจริง',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!user.value.last_name) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกนามสกุล',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!user.value.business_name) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกชื่อทางธุรกิจ',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!user.value.id_card || user.value.id_card?.length != 13) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณาตรวจสอบเลขบัตรประชาชน',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!user.value.phone || user.value.phone?.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณาตรวจสอบเบอร์โทรศัพท์',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!upload.value.id_card) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณาเพิ่มรูปบัตรประชาชน',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!address.value.zipcode) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกที่อยู่ตามบัตรให้ครบถ้วน',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!delivery_address.value.zipcode) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกที่อยู่จัดส่งให้ครบถ้วน',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!bank.value.id) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณาเลือกบัญชีธนาคาร',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!bank.value.number) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกเลขบัญชีธนาคาร',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!bank.value.branch) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกสาขาบัญชีธนาคาร',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!bank.value.account_name) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณากรอกชื่อเจ้าของบัญชี',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    if (!upload.value.bookbank) {
        Swal.fire({
            icon: 'error',
            title: 'กรุณาตรวจสอบข้อมูล',
            text: 'กรุณาเพิ่มรูปหน้าบัญชีธนาคาร',
            showConfirmButton: false,
            timer: 3000
        })
        return
    }
    else {
        return true
    }
}

const sendRegisterHandler = () => {
    const validatePass = checkValidation()
    if (!validatePass) return
    visibleTerms.value = true
}

const sendRegister = async () => {
    isLoading.value = true;
    const formdata = new FormData();
    // introducer
    formdata.append('sponser', from.value.user_name);

    // qualification
    formdata.append('sizebusiness', user.value.qualification_id);
    formdata.append('pv', user.value.pv);

    // main info
    formdata.append('prefix_name', user.value.prefix_name);
    formdata.append('gender', user.value.gender);
    formdata.append('first_name', user.value.first_name);
    formdata.append('last_name', user.value.last_name);
    formdata.append('name', `${user.value.prefix_name || ''}${user.value.first_name || ''}`);
    formdata.append('business_name', user.value.business_name);
    formdata.append('birth_day', `${user.value.birth_year || 1947}-${user.value.birth_month || 1}-${user.value.birth_day || 1}`);
    formdata.append('day', `${user.value.birth_day || 1}`);
    formdata.append('month', `${user.value.birth_month || 1}`);
    formdata.append('year', `${user.value.birth_year || 1947}`);
    formdata.append('nation_id', user.value.nation_id);
    formdata.append('id_card', user.value.id_card);

    // contract
    formdata.append('email', user.value.email || '-');
    formdata.append('phone', user.value.phone);
    formdata.append('line_id', user.value.line_id || '-');
    formdata.append('facebook', user.value.facebook || '-');
    
    // address
    formdata.append('card_address', address.value.address);
    formdata.append('card_moo', address.value.moo);
    formdata.append('card_soi', address.value.soi || '-');
    formdata.append('card_road', address.value.road || '-');
    formdata.append('card_tambon', selected_subdistrict.value.id);
    formdata.append('card_district', selected_district.value.code);
    formdata.append('card_province', selected_province.value.code);
    formdata.append('card_zipcode', address.value.zipcode);
    formdata.append('card_phone', address.value.phone);

    // address img
    formdata.append('file_card', upload.value.id_card);

    // address delivery
    formdata.append('same_address', delivery_address.value.address);
    formdata.append('same_moo', delivery_address.value.moo);
    formdata.append('same_soi', delivery_address.value.soi);
    formdata.append('same_road', delivery_address.value.road);
    formdata.append('same_tambon', d_selected_subdistrict.value.id);
    formdata.append('same_district', d_selected_district.value.code);
    formdata.append('same_province', d_selected_province.value.code);
    formdata.append('same_zipcode', delivery_address.value.zipcode);
    formdata.append('same_phone', delivery_address.value.phone);
    formdata.append('same_status', useLikeAddress.value ? 1 : 2);
    
    // bank
    formdata.append('bank_name', bank.value.id);
    formdata.append('bank_branch', bank.value.branch);
    formdata.append('bank_no', bank.value.number);
    formdata.append('account_name', bank.value.account_name);

    // address img
    formdata.append('file_bank', upload.value.bookbank);

    // customer benefit
    formdata.append('name_benefit', valuable.value.first_name);
    formdata.append('last_name_benefit', valuable.value.last_name);
    formdata.append('involved', valuable.value.relation);

    try {
        const { data } = await axios.post(`${process.env.VUE_APP_MLM}/RegisterUrl`, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        //console.log(data)
        if (data.status === 'success') {
            visibleTerms.value = false
            data_result.value = {...data.data_result, sizebusiness: user.value.qualification_id}
            const queryString = new URLSearchParams(data_result.value).toString();
            router.push(`/customer/register-downline/success?${queryString}`)
        } else {
            Swal.fire({
                title: "กรุณาตรวจสอบข้อมูลอีกครั้ง",
                text: data.ms,
                icon: "error",
                confirmButtonColor: "#8B2FC9",
                confirmButtonText: "เข้าใจแล้ว"
            });
        }
    }
    catch (error) {
        visibleTerms.value = false
        //console.log(error)
        Swal.fire({
            title: "เกิดข้อผิดพลาดเล็กน้อย",
            text: "กรุณาตรวจสอบข้อมูลอีกครั้ง หรือติดต่อผู้ดูแลระบบ",
            icon: "error"
        });
    }
    finally {
        isLoading.value = false
        visibleTerms.value = false
    }
}

const data_result = ref({});
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 100px;
  aspect-ratio: 1;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  background: #fff;
  filter: blur(5px) contrast(10) hue-rotate(0deg);
  mix-blend-mode: darken;
}
.loader:before,
.loader:after{ 
  content: "";
  grid-area: 1/1; 
  width: 40px;
  height: 40px;
  background: #ff34d3;
  animation: l7 2s infinite;
}
.loader:after{ 
  animation-delay: -1s;
}
@keyframes l7{
  0%   {transform: translate(   0,0)}
  25%  {transform: translate(100%,0)}
  50%  {transform: translate(100%,100%)}
  75%  {transform: translate(   0,100%)}
  100% {transform: translate(   0,0)}
}
</style>