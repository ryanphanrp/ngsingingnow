#This file is part of htmlentity2ascii.  The COPYRIGHT file at the top level of
#this repository contains the full copyright notices and license terms.
'''
Convert str to slug
'''
import re
import unicodedata

__version__ = '2.0'

def slug(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """

    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore')
    value = re.sub('[^\w\s-]', '', value.decode('utf-8')).strip().lower()
    return re.sub('[-\s]+', '-', value)
