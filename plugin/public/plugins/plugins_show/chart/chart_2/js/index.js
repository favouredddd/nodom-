
DD.createModule({
    el: '#app',
    data: {
        line: {
            "title": "折线图",
            "legend": "",
            "marker": false,
            "titleColor": "#000000",
            "gridLine": 0,
            "gridLineColor": "#cccccc",
            "legends": [
                { "value": "", "text": "无" },
                { "value": "top", "text": "顶部" },
                { "value": "right", "text": "右侧" },
                { "value": "bottom", "text": "底部" }
            ],
            "lines": [
                { "value": 0, "text": "无" },
                { "value": 1, "text": "横向" },
                { "value": 2, "text": "纵向" },
                { "value": 3, "text": "全部" }
            ],
            "data": [{
                "title": "成都店",
                "datas": [
                    { "x": "1月", "y": 300 },
                    { "x": "2月", "y": 320 },
                    { "x": "3月", "y": 280 },
                    { "x": "4月", "y": 250 },
                    { "x": "5月", "y": 300 },
                    { "x": "6月", "y": 380 }
                ]
            }, {
                "title": "北京店",
                "datas": [
                    { "x": "1月", "y": 900 },
                    { "x": "2月", "y": 820 },
                    { "x": "3月", "y": 880 },
                    { "x": "4月", "y": 850 },
                    { "x": "5月", "y": 900 },
                    { "x": "6月", "y": 980 }
                ]
            }, {
                "title": "上海店",
                "datas": [
                    { "x": "1月", "y": 600 },
                    { "x": "2月", "y": 520 },
                    { "x": "3月", "y": 580 },
                    { "x": "4月", "y": 550 },
                    { "x": "5月", "y": 600 },
                    { "x": "6月", "y": 680 }
                ]
            }],
            addTitle: '',
            addData: ''
        },
    },
})