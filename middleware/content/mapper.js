
const transformAgent = (agentData, includes) => {
    const picture = includes.Asset.find(asset => asset.sys.id === agentData.fields.picture.sys.id)
    return {
        id: agentData.sys.id,
        bio: agentData.fields.bio,
        name: agentData.fields.name,
        slug: agentData.fields.slug,
        title: agentData.fields.seoTitle,
        picture: picture.fields.file,
        isManager: agentData.fields.isManager,
        bioSummary: agentData.fields.bioSummary,
        cssClasses: agentData.fields.cssClasses || '',
        description: agentData.fields.seoDescription,
        emailAddress: agentData.fields.emailAddress,
        facebookSlug: agentData.fields.facebookSlug,
        mobileNumber: agentData.fields.mobileNumber,
        officeNumber: agentData.fields.officeNumber
    }
}

const transformAgencyResponse = (response) => {
    let agencies = []
    response.items.forEach( (agency) => {
        const agents = []
        agency.fields.agents.forEach( (agent) => {
            agents.push(transformAgent(response.includes.Entry.find( (agentEntry) =>
                agentEntry.sys.id === agent.sys.id
            ), response.includes))
        })
        let backgroundImage, teamPhoto
        if (agency.fields.teamPhoto) {
            teamPhoto = response.includes.Asset.find(asset => asset.sys.id === agency.fields.teamPhoto.sys.id)
        }
        if (agency.fields.backgroundImage) {
            backgroundImage = response.includes.Asset.find(asset => asset.sys.id === agency.fields.backgroundImage.sys.id)
        }
        agencies.push({
            agents,
            id: agency.sys.id,
            name: agency.fields.name,
            slug: agency.fields.slug,
            title: agency.fields.seoTitle,
            cssClasses: agency.fields.cssClasses || '',
            description: agency.fields.seoDescription,
            address1: agency.fields.addressLine1,
            address2: agency.fields.addressLine2,
            city: agency.fields.city,
            state: agency.fields.state,
            zipCode: agency.fields.zipCode,
            county: agency.fields.county,
            phoneNumber: agency.fields.phoneNumber,
            emailAddress: agency.fields.emailAddress,
            hours: agency.fields.hours,
            latitude: agency.fields.latitude,
            longitude: agency.fields.longitude,
            teamPhoto: teamPhoto ? {
                url: teamPhoto.fields.file.url,
                title: teamPhoto.fields.title,
                description: teamPhoto.fields.description
            } : null,
            backgroundImage: backgroundImage ? {
                url: backgroundImage.fields.file.url,
                title: backgroundImage.fields.title,
                description: backgroundImage.fields.description
            } : null,
            alert: agency.fields.alert,
            welcomeMessage: agency.fields.welcomeMessage,
            pageComponents: agency.fields.pageComponents ? transformPageComponents(agency.fields.pageComponents, response.includes) : []
        })
    })
    return agencies
}

const transformAgentResponse = (response) => {
    let agents = []
    response.items.forEach( (agent) => {
        agents.push(transformAgent(agent, response.includes))
    })
    return agents
}

const transformDynamicComponent = (dynamicComponent, includes) => {
    let bgImageAsset
    if (dynamicComponent.fields.backgroundImage) {
        bgImageAsset = includes.Asset.find( (asset) => asset.sys.id === dynamicComponent.fields.backgroundImage.sys.id)
    }
    return {
        id: dynamicComponent.sys.id,
        type: dynamicComponent.sys.contentType.sys.id,
        // type: dynamicComponent.fields.component,
        header: dynamicComponent.fields.header,
        metadata: dynamicComponent.fields.metadata,
        component: dynamicComponent.fields.component,
        cssClasses: dynamicComponent.fields.cssClasses,
        backgroundImage: bgImageAsset ? {
            url: bgImageAsset.fields.file.url,
            name: bgImageAsset.fields.title
        } : null
    }
}

const transformFieldGuide = (fieldGuideEntry, includes, isSummary) => {
    let imageAsset
    let thumbnailAsset
    if (fieldGuideEntry.fields.image) {
        imageAsset = includes.Asset.find( (asset) => asset.sys.id === fieldGuideEntry.fields.image.sys.id)
    }
    if (fieldGuideEntry.fields.thumbnail) {
        thumbnailAsset = includes.Asset.find( (asset) => asset.sys.id === fieldGuideEntry.fields.thumbnail.sys.id)
    }
    let fieldGuide = {
        id: fieldGuideEntry.sys.id,
        type: fieldGuideEntry.sys.contentType.sys.id,
        slug: fieldGuideEntry.fields.slug,
        title: fieldGuideEntry.fields.title,
        summary: fieldGuideEntry.fields.summary,
        thumbnail: thumbnailAsset ? {
            url: thumbnailAsset.fields.file.url,
            name: thumbnailAsset.fields.title
        } : null
    }
    if (isSummary) {
        return fieldGuide
    } else {
        fieldGuide.body = fieldGuideEntry.fields.body
        fieldGuide.image = imageAsset ? {
            url: imageAsset.fields.file.url,
            name: imageAsset.fields.title
        } : null
        fieldGuide.cssClasses = fieldGuideEntry.fields.cssClasses
        return fieldGuide
    }
}

const transformFieldGuideResponse = (response) => {
    let fieldGuides = []
    response.items.forEach( (fieldGuide) => {
        fieldGuides.push(transformFieldGuide(fieldGuide, response.includes, false))
    })
    return fieldGuides
}


const transformHeroComponent = (heroComponentEntry, includes) => {
    const bgImageAsset = includes.Asset.find( (asset) => asset.sys.id === heroComponentEntry.fields.backgroundImage.sys.id)
    return {
        id: heroComponentEntry.sys.id,
        type: heroComponentEntry.sys.contentType.sys.id,
        title: heroComponentEntry.fields.title,
        content: heroComponentEntry.fields.content,
        alignContent: heroComponentEntry.fields.alignContent,
        backgroundImage: {
            url: bgImageAsset.fields.file.url,
            name: bgImageAsset.fields.title
        },
        ctaButton1Subtitle: heroComponentEntry.fields.ctaButton1Subtitle,
        ctaButton1Path: heroComponentEntry.fields.ctaButton1Route,
        ctaButton2Subtitle: heroComponentEntry.fields.ctaButton2Subtitle,
        ctaButton2Path: heroComponentEntry.fields.ctaButton2Route,
        cssClasses: heroComponentEntry.fields.cssClasses
    }
}

const transformPromo = (promoEntry, includes) => {
    const imageAsset = includes.Asset.find( (asset) => asset.sys.id === promoEntry.fields.image.sys.id)
    return {
        id: promoEntry.sys.id,
        type: promoEntry.sys.contentType.sys.id,
        title: promoEntry.fields.title,
        body: promoEntry.fields.body,
        image: {
            url: imageAsset.fields.file.url,
            name: imageAsset.fields.title
        },
        cssClasses: promoEntry.fields.cssClasses
    }
}

const transformTestimonial = (testimonialEntry, includes) => {
    const imageAsset = includes.Asset.find( (asset) => asset.sys.id === testimonialEntry.fields.picture.sys.id)
    return {
        id: testimonialEntry.sys.id,
        name: testimonialEntry.fields.name,
        type: testimonialEntry.sys.contentType.sys.id,
        location: testimonialEntry.fields.location,
        testimonial: testimonialEntry.fields.testimonial,
        picture: {
            url: imageAsset.fields.file.url,
            name: imageAsset.fields.title
        },
        cssClasses: testimonialEntry.fields.cssClasses
    }
}

const transformImageComponent = (imageComponentEntry, includes) => {
    const imageAsset = includes.Asset.find( (asset) => asset.sys.id === imageComponentEntry.fields.image.sys.id)
    return {
        id: imageComponentEntry.sys.id,
        type: imageComponentEntry.sys.contentType.sys.id,
        title: imageComponentEntry.fields.title,
        image: {
            url: imageAsset.fields.file.url,
            name: imageAsset.fields.title,
            size: imageAsset.fields.file.details.size,
            width: imageAsset.fields.file.details.image.width,
            height: imageAsset.fields.file.details.image.height,
            fileName: imageAsset.fields.file.fileName,
            contentType: imageAsset.fields.file.contentType
        },
        cssClasses: imageAsset.fields.cssClasses
    }
}

const transformHTMLComponent = (htmlComponentEntry) => {
    return {
        id: htmlComponentEntry.sys.id,
        html: htmlComponentEntry.fields.html,
        type: htmlComponentEntry.sys.contentType.sys.id,
        cssClasses: htmlComponentEntry.fields.cssClasses
    }
}

const transformRichTextComponent = (rtComponentEntry) => {
    return {
        id: rtComponentEntry.sys.id,
        body: rtComponentEntry.fields.body,
        type: rtComponentEntry.sys.contentType.sys.id,
        cssClasses: rtComponentEntry.fields.cssClasses
    }
}

const transformComponent = (componentEntry, includes) => {
    let component
    switch (componentEntry.sys.contentType.sys.id) {
        case 'carousel-component':
            component = transformCarouselComponent(componentEntry, includes)
            break
        case 'dynamic-component':
            component = transformDynamicComponent(componentEntry, includes)
            break
        case 'field-guide':
            component = transformFieldGuide(componentEntry, includes, true)
            break
        case 'hero-component':
            component = transformHeroComponent(componentEntry, includes)
            break
        case 'html-component':
            component = transformHTMLComponent(componentEntry)
            break
        case 'image-component':
            component = transformImageComponent(componentEntry, includes)
            break
        case 'promo':
            component = transformPromo(componentEntry, includes)
            break;
        case 'tab-component':
            component = transformTabComponent(componentEntry, includes)
            break
        case 'testimonial':
            component = transformTestimonial(componentEntry, includes)
            break;
        case 'x-up-component':
            component = transformXUpComponent(componentEntry, includes)
            break
        case 'rich-text-component':
        default:
            component = transformRichTextComponent(componentEntry)
            break;
    }
    return component
}

const transformCarouselComponent = (carouselComponent, includes) => {
    const items = []
    carouselComponent.fields.contentItems.forEach( (item) => {
        const itemEntry = includes.Entry.find( (entry) => entry.sys.id === item.sys.id)
        items.push(transformComponent(itemEntry, includes))
    })
    return {
        items,
        id: carouselComponent.sys.id,
        type: carouselComponent.sys.contentType.sys.id,
        title: carouselComponent.fields.title,
        header: carouselComponent.fields.header,
        cssClasses: carouselComponent.fields.cssClasses
    }
}

const transformXUpComponent = (xUpComponent, includes) => {
    const items = []
    xUpComponent.fields.contentItems.forEach( (item) => {
        const itemEntry = includes.Entry.find( (entry) => entry.sys.id === item.sys.id)
        if (itemEntry) {
            items.push(transformComponent(itemEntry, includes))
        }
    })
    return {
        items,
        id: xUpComponent.sys.id,
        type: xUpComponent.sys.contentType.sys.id,
        title: xUpComponent.fields.title,
        header: xUpComponent.fields.header,
        cssClasses: xUpComponent.fields.cssClasses,
        numItemsToDisplay: xUpComponent.fields.numberItemsToDisplay
    }
}

const transformTabComponent = (tabComponent, includes) => {
    const items = []
    tabComponent.fields.contentItems.forEach( (item) => {
        const itemEntry = includes.Entry.find( (entry) => entry.sys.id === item.sys.id)
        items.push(transformComponent(itemEntry, includes))
    })
    return {
        items,
        id: tabComponent.sys.id,
        type: tabComponent.sys.contentType.sys.id,
        title: tabComponent.fields.title,
        header: tabComponent.fields.header,
        cssClasses: tabComponent.fields.cssClasses,
        headerLabels: tabComponent.fields.tabHeaderLabels
    }
}

const transformPageComponents = (pageComponents, includes) => {
    let components = []
    pageComponents.forEach( (pageComponent) => {
        const componentEntry = includes.Entry.find( (entry) => entry.sys.id === pageComponent.sys.id)
        if (componentEntry) {
            components.push(transformComponent(componentEntry, includes))
        }
    })
    return components
}

const transformContentResponse = (response) => {
    return {
        id: response.items[0].sys.id,
        slug: response.items[0].fields.slug,
        title: response.items[0].fields.seoTitle,
        cssClasses: response.items[0].fields.cssClasses || '',
        description: response.items[0].fields.seoDescription,
        pageComponents: transformPageComponents(response.items[0].fields.pageComponents, response.includes)
    }
}

const transformFAQsResponse = (response) => {
    let faqs
    let category
    let faqCategories = []
    response.items.forEach((faq) => {
        if (category !== faq.fields.category) {
            faqs = []
            faqCategories.push({ 
                faqs,
                name: category = faq.fields.category
            })
        }
        faqs.push({
            id: faq.sys.id,
            answer: faq.fields.answer,
            question: faq.fields.question
        })
    })
    return faqCategories
}

export {
    transformAgentResponse,
    transformAgencyResponse,
    transformContentResponse,
    transformFAQsResponse,
    transformFieldGuideResponse
}