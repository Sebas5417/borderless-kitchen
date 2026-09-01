/**
 * Shared Offer fragments for schema.org merchant listings.
 *
 * Google Search Console flags an `Offer` that carries only price +
 * availability: `shippingDetails` and `hasMerchantReturnPolicy` are reported
 * as missing fields on every product/book page. Every book on the site is
 * fulfilled by Amazon US, so both fragments describe Amazon's published
 * policy rather than anything we operate ourselves — revisit them if that
 * policy changes or if a volume ever sells through a second channel.
 */

/** Amazon US: books ship free, handled same/next day, 1-5 days in transit. */
export const AMAZON_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "US",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 1,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 5,
      unitCode: "DAY",
    },
  },
} as const;

/** Amazon US: 30-day return window, free returns by mail. */
export const AMAZON_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
} as const;

/**
 * A digital (Kindle) offer never ships, but Google still expects the field,
 * so declare a zero-cost, zero-day delivery instead of omitting it.
 */
export const DIGITAL_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "US",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 0,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 0,
      unitCode: "DAY",
    },
  },
} as const;

type AmazonOfferInput = {
  url: string;
  price: string;
  /** Kindle offers swap the shipping fragment for the digital one. */
  digital?: boolean;
};

/** Amazon Offer with the two merchant-listing fields Google asks for. */
export function amazonOffer({ url, price, digital = false }: AmazonOfferInput) {
  return {
    "@type": "Offer",
    url,
    priceCurrency: "USD",
    price,
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Amazon" },
    shippingDetails: digital
      ? DIGITAL_SHIPPING_DETAILS
      : AMAZON_SHIPPING_DETAILS,
    hasMerchantReturnPolicy: AMAZON_RETURN_POLICY,
  };
}

/**
 * Every merchant listing needs an `image`; `coverImageSrc` is optional in the
 * book frontmatter, so fall back to the series banner rather than emitting a
 * Book with no image at all.
 */
export const FALLBACK_BOOK_IMAGE = "/images/banner-books.png";

export function absoluteImage(src: string | undefined) {
  return `https://borderlesskitchenseries.com${src ?? FALLBACK_BOOK_IMAGE}`;
}
