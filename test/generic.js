var test = require('tape'),
    Enti = require('enti'),
    doc = require('doc-js')
    createFastn = require('./createFastn');

test('div', function(t){

    t.plan(2);

    var fastn = createFastn();

    var div = fastn('div');

    div.render();

    doc.ready(function(){
        document.body.appendChild(div.element);

        t.equal(document.body.childNodes.length, 1);
        t.equal(document.body.childNodes[0].tagName, 'DIV');

        div.element.remove();
        div.destroy();
    });

});

test('special properties - input value - undefined', function(t){

    t.plan(3);

    var fastn = createFastn();

    var input = fastn('input', {value: undefined});

    input.render();

    doc.ready(function(){
        document.body.appendChild(input.element);

        t.equal(document.body.childNodes.length, 1);
        t.equal(document.body.childNodes[0].tagName, 'INPUT');
        t.equal(document.body.childNodes[0].value, '');

        input.element.remove();
        input.destroy();
    });

});

test('special properties - input value - dates', function(t){

    t.plan(8);

    var fastn = createFastn();

    var input = fastn('input', {
        type: 'date',
        value: new Date('2015-01-01'),
        onchange: 'value:value',
        onclick: 'value:value' // so I can trigger events..
    });

    input.render();

    doc.ready(function(){
        document.body.appendChild(input.element);

        t.equal(document.body.childNodes.length, 1);
        t.equal(document.body.childNodes[0].tagName, 'INPUT');
        t.equal(document.body.childNodes[0].value, '2015-01-01');
        t.deepEqual(input.value(), new Date('2015-01-01'));

        input.value(new Date('2015-02-02'));

        t.equal(document.body.childNodes[0].value, '2015-02-02');
        t.deepEqual(input.value(), new Date('2015-02-02'));

        input.element.value = '2016-02-02';
        input.element.click();

        t.equal(document.body.childNodes[0].value, '2016-02-02');
        t.deepEqual(input.value(), new Date('2016-02-02'));

        input.element.remove();
        input.destroy();
    });

});

test('special properties - disabled', function(t){

    t.plan(4);

    var fastn = createFastn();

    var button = fastn('button', {
        type: 'button',
        disabled: false
    });

    button.render();

    doc.ready(function(){
        document.body.appendChild(button.element);

        t.equal(document.body.childNodes.length, 1);
        t.equal(document.body.childNodes[0].tagName, 'BUTTON');
        t.equal(document.body.childNodes[0].getAttribute('disabled'), null);

        button.disabled(true);

        t.equal(document.body.childNodes[0].getAttribute('disabled'), 'disabled');

        button.element.remove();
        button.destroy();
    });

});

test('special properties - textContent', function(t){

    t.plan(4);

    var fastn = createFastn();

    var label = fastn('label', {
        textContent: 'foo'
    });

    label.render();

    doc.ready(function(){
        document.body.appendChild(label.element);

        t.equal(document.body.childNodes.length, 1);
        t.equal(document.body.childNodes[0].tagName, 'LABEL');
        t.equal(document.body.childNodes[0].textContent, 'foo');

        label.textContent(null);

        t.equal(document.body.childNodes[0].textContent, '');

        label.element.remove();
        label.destroy();
    });

});