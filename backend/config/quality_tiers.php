<?php

/**
 * Quality Tier Price Bands (Men's Collection: Shalwar Kameez, Kurta)
 *
 * These thresholds are the ONLY place tier boundaries are defined.
 * Product::getQualityTierAttribute() reads this file to label a product
 * as economy / medium / premium based on its base_price — the tier is
 * never stored on the product itself, so price and label can never
 * drift out of sync.
 *
 * Values are in PKR. Edit these numbers any time price positioning
 * changes — no migration or code change required.
 *
 * Rule: price < economy_max        => "economy"
 *       price < medium_max         => "medium"
 *       otherwise                  => "premium"
 */

return [
    'economy_max' => 3000,   // anything below this = Economy Quality
    'medium_max'  => 6000,   // anything below this (and >= economy_max) = Medium Quality
                              // anything >= medium_max = Premium Quality
];