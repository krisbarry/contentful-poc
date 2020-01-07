import axios from 'axios'
import { getOptions } from '../axios'
import {
    transformAgencyResponse, transformAgentResponse, transformContentResponse, transformFAQsResponse, transformFieldGuideResponse
} from './mapper.js'

const findContent = async (slug, params) => {
    try {
        let transformResponse = transformContentResponse
        let url = `${process.env.CONTENT_API_ENDPOINT}&content_type=page&fields.slug=${slug}&locale=${params.locale}&include=2`
        if (params.slug) {
            if (slug === 'agency-agency') {
                transformResponse = transformAgencyResponse
                url = `${process.env.CONTENT_API_ENDPOINT}&content_type=agency&fields.slug=${params.slug}&locale=${params.locale}&include=2`
            } else if (slug === 'agent-agent') {
                transformResponse = transformAgentResponse
                url = `${process.env.CONTENT_API_ENDPOINT}&content_type=agent&fields.slug=${params.slug}&locale=${params.locale}&include=2`
            } else if (slug === 'agencies-searchFor') {
                url = `${process.env.CONTENT_API_ENDPOINT}&content_type=page&fields.slug=agencies&locale=${params.locale}&include=2`
            } else if (slug === 'field-guide-fieldGuide') {
                transformResponse = transformFieldGuideResponse
                url = `${process.env.CONTENT_API_ENDPOINT}&content_type=field-guide&fields.slug=${params.slug}&locale=${params.locale}`
            }
        } else if (slug === 'faq') {
            transformResponse = transformFAQsResponse
            url = `${process.env.CONTENT_API_ENDPOINT}&content_type=faq&locale=${params.locale}&order=fields.category`
        }
        const response = await axios(getOptions({
            url,
            transformResponse
        }))
        return response.data
    } catch(e) {
        console.log('Error thrown finding page content: ' + e)
        throw e
    }
}

const searchAgencies = async (searchObj) => {
    try {
        let url
        if (searchObj.name) {
            url = `${process.env.CONTENT_API_ENDPOINT}&content_type=agency&fields.name[match]=${searchObj.name}`
        } else if (searchObj.zipCode) {
            url = `${process.env.CONTENT_API_ENDPOINT}&content_type=agency&fields.zipCode[match]=${searchObj.zipCode}`
        } else {
            url = `${process.env.CONTENT_API_ENDPOINT}&content_type=agency&fields.county=${searchObj.county}`
        }
        const response = await axios(getOptions({
            url,
            transformResponse: transformAgencyResponse
        }))
        return response.data
    } catch(e) {
        console.log('Error thrown searching agencies content: ' + e)
        throw e
    }
}

export {
    findContent,
    searchAgencies
}