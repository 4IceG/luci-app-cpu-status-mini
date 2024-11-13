'use strict';
'require baseclass';
'require fs';


/*
	Copyright 2023-2024 Rafał Wabik - IceG - From eko.one.pl forum
	
	Licensed to the GNU General Public License v3.0.
*/


function progressbar(value, max, free, byte) {
	var vn = parseInt(value) || 0,
	    mn = parseInt(max) || 100,
	    fv = byte ? String.format('%1024.2mB', value) : value,
	    fm = byte ? String.format('%1024.2mB', max) : max,
	    fr = byte ? String.format('%1024.2mB', free) : free,
	    pc = Math.floor((100 / mn) * vn),
	    sp = _('free from');

	return E('div', {
		'class': 'cbi-progressbar',
		'title': '%s %s %s (%d%%)'.format(fr, sp, fm, pc, fv)
	}, E('div', { 'style': 'width:%.2f%%'.format(pc) }));
}

return baseclass.extend({
	title : _('External storage'),

	load: function() {
		return Promise.all([
			L.resolveDefault(fs.exec_direct('/bin/df', [ '-k' ]),''),
			L.resolveDefault(fs.exec("/usr/bin/lsblk", ["-n", "-J", "-do", "NAME,TRAN,ROTA,RM,VENDOR,MODEL"]))
		]);
	},

	render: function(driveData) {
		if(!driveData) return;

		var index = 0;
		var values = driveData[0].trim().split('\n');

		for(index = 0; index < values.length; index++) {

		var lines = values[index].trim().split('\n');
  			for (var i = 0; i < lines.length; i++)
  			{
    				var line = lines[i];
   				{
    				if (line.indexOf("/dev/s") != -1) 
   					{

      					var tp = line.split('/dev/s')[1];
        				var nt = tp.trim().replace(/ +(?= )/g,'');
        				var arr = nt.split(" ");

						var fields = [];

						var json = JSON.parse(driveData[1].stdout);
						var end = ( 'blockdevices' in json ) ? json['blockdevices'] : [];

						var disk = end.find(o => o.name === 's'+arr[0].slice(0, -1));

  						(arr != null) ? fields.push(_('Disk') + '\xa0' + disk['vendor'] + disk['model'] + ' (' + disk['tran'] + ')', arr[2]*1024, arr[1]*1024, arr[3]*1024) : '?'

						var table = E('table', { 'class': 'table' });

						for (var i = 0; i < fields.length; i += 4) {
							table.appendChild(E('tr', { 'class': 'tr' }, [
									E('td', { 'class': 'td left', 'width': '33%' }, [ fields[i].replace(/\s+/g, ' ').trim() ]),
									E('td', { 'class': 'td left' }, [
										(fields[i + 1] != null) ? progressbar(fields[i + 1], fields[i + 2], fields[i + 3], true) : '?'
										])
									]));
								}
    						}
  					}
				}
			}
			return table;
	},
});
