
        window.addEventListener("load", function() {
            if (window.location === window.parent.location) {
                const date = new Date();

    		document.getElementById('infoVersion').innerHTML = '3.0.11';
    		document.getElementById('infoBuild').innerHTML = `<span class="card-title card-info">Generated using Studio CLI on</span><span class="card-title card-info">${date.toLocaleString()}</span>`
            }
    
            
    
            $(document).on('click', '.triggerFullViewModal', function(event) {
                const _ = cf.getDependency('lodash');
                $('body').css('overflow', 'hidden');
                $('#fullView').show();
                $('#fullViewTitle').html(_.escape(event.currentTarget.getAttribute('data-title')));
                const selectedVisualization = cf.getVisualization(event.currentTarget.getAttribute('data-widget'));
    
                if (selectedVisualization) {
                    const comparative = selectedVisualization._visualization._definition.config.comparative;
                    const fullViewVisualization = selectedVisualization.duplicate();
                    const query = (Array.isArray(comparative) && comparative.length > 0);
                    
                    fullViewVisualization.element('fullViewBody');
                    fullViewVisualization.on('execute:start', function() {
                        $('.loader-fullview').show();
                    });
                    fullViewVisualization.on('execute:stop', function() {
                        $('.loader-fullview').hide();
                    });
                    fullViewVisualization.off('click');
                    fullViewVisualization.execute(Boolean(fullViewVisualization.get('nonQuery')));
                }
            });
    
            $('#closeFullViewModal').on('click', function() {
                $('#fullView').hide();
                cf.getVisualization('fullViewBody').remove();
                $('body').css('overflow', 'auto');
            });
    
            $('.grid-stack-item').on('mouseenter', e => {
                $(e.currentTarget).find('.fullViewIcon').show();
            });
    
            $('.grid-stack-item').on('mouseleave', e => {
                $(e.currentTarget).find('.fullViewIcon').hide();
            });
    
            
        $('#chartFactorLogo').on('click', function() {
            const infoContainer = $('#studioInfo');
            const toggleDisplay = infoContainer.css('display') === 'none' ? 'block' : 'none';
            
            infoContainer.css('display', toggleDisplay);
        });
    
        });
    