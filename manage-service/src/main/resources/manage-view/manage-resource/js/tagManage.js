/**
 * 标签管理相关前端脚本
 * Created by CJ on 29/06/2017.
 */
$(function () {
    var _body = $('body');

    var dataUrl = _body.attr('data-url');
    var table = $('#tagTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": dataUrl,
            "data": function (d) {
                // return $.extend({}, d, extendData());
                return d;
            }
        },
        "ordering": true,
        "lengthChange": false,
        "searching": false,
        "colReorder": true,
        "columns": [
            {
                "title": "名称", "data": "name", "name": "name"
            },
            {
                "title": "类型", "data": "type", "name": "type"
            },
            // {
            //     "title": "图标", "data": "icon", "name": "icon"
            // },
            {
                "title": "权重", "data": "weight", "name": "weight"
            },
            {
                "title": "禁用", "data": "disabled", "name": "disabled"
            },
            {
                title: "操作",
                className: 'table-action',
                data: function (item) {
                    var a;
                    if (item.disabled.indexOf('启用') > -1)
                        a = '<a href="javascript:;" class="js-disableTag" data-id="' + item.name + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;禁用</a>';
                    else
                        a = '<a href="javascript:;" class="js-enableTag" data-id="' + item.name + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;启用</a>';
                    var b = '<a href="javascript:;" class="js-editTag" data-id="' + item.name + '"><i class="fa fa-trash-o"></i>&nbsp;编辑</a>';
                    var c = '<a href="javascript:;" class="js-deleteTag" data-id="' + item.name + '"><i class="fa fa-trash-o"></i>&nbsp;删除</a>';
                    return a + b + c;
                }
            }
        ],
        "displayLength": 15,
        "drawCallback": function () {
            // clearSearchValue();
        },
        "dom": "<'row'<'col-sm-12'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        "buttons": [{
            "extend": "excel",
            "text": "导出 Excel",
            "className": "btn-xs",
            "exportOptions": {
                "columns": ":not(.table-action)"
            }
        }, {
            "extend": 'colvis',
            "text": "筛选列",
            "className": "btn-xs"
        }]
    });

    $(document).on('click', '.js-disableTag', function () {
        $.ajax(dataUrl + "/disable?name=" + $(this).attr('data-id'), {
            method: 'put',
            data: {name: $(this).attr('data-id')},
            success: function () {
                table.ajax.reload();
            }
        });
    }).on('click', '.js-enableTag', function () {
        $.ajax(dataUrl + "/enable?name=" + $(this).attr('data-id'), {
            method: 'put',
            success: function () {
                table.ajax.reload();
            }
        });
    }).on('click', '.js-editTag', function () {
        window.location.href = _body.attr('data-edit-url') + "?name=" + $(this).attr('data-id');
    }).on('click', '.js-deleteTag', function () {
        $.ajax(dataUrl + "?name=" + $(this).attr('data-id'), {
            method: 'delete',
            success: function () {
                table.ajax.reload();
            }
        });
    });
});