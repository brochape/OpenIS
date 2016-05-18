const SPARQL = {
    PREFIXES: 'PREFIX geo: <http://www.opengis.net/ont/geosparql#>\n'+
              'PREFIX geof: <http://www.opengis.net/def/function/geosparql/>\n' +
              'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n' +
              'PREFIX sf: <http://www.opengis.net/ont/sf#>\n' +
              'PREFIX tr: <http://openis.ititou.be/ont#>\n',

    /* Perform a SPARQL query against our endpoint.
       Add common prefixes before running the query.
       Return a jQuery AJAX future (use fut.done()/.fail()) */
    query: function (Q, cont) {
        var payload = {
            query: this.PREFIXES + Q,
            display: "json",
            custom: "",
            stylesheet: "",
            output: "json"
        };

        return $.post("http://openis.ititou.be:8080/parliament/sparql", payload);
    },

    /* Load a template query. Return a function, which can be called
       with a context and return a query string */
    loadTemplate: function(name){
        var raw = $('#' + name + '.sparql-template').text();
        return function(ctx){
            return raw.replace(/\$\{([^\}]+)\}/g, function(_, x){
                return ctx[x];
            });
        };
    }
};
