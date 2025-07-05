// Enhanced Analysis Results Display Component
// Add this to your create/page.tsx where analysis results are shown

{analysisResults && (
  <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-8 space-y-8">
    {/* Header */}
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
        <Brain className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">AI Analysis Complete ✨</h3>
        <p className="text-gray-600">Intelligent scoping for "{projectData.title}"</p>
      </div>
    </div>

    {/* Overview Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* Complexity & Pricing */}
      <div className="bg-emerald-50 rounded-lg p-6">
        <h4 className="font-semibold text-emerald-800 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Project Overview
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-emerald-700">Complexity:</span>
            <span className="font-bold text-emerald-800">{analysisResults.complexity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-emerald-700">Score:</span>
            <span className="font-bold text-emerald-800">{analysisResults.complexity_score}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-emerald-700">Total Cost:</span>
            <span className="font-bold text-emerald-800 text-lg">${analysisResults.total_cost?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-emerald-700">Hourly Rate:</span>
            <span className="font-bold text-emerald-800">${analysisResults.hourly_rate}/hr</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Timeline Analysis
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-blue-700">Industry Standard:</span>
            <p className="font-bold text-blue-800">{analysisResults.timeline?.industry_standard}</p>
          </div>
          <div>
            <span className="text-sm text-blue-700">Tinkerly Delivery:</span>
            <p className="font-bold text-blue-800 text-lg">{analysisResults.timeline?.accelerated}</p>
          </div>
          <div className="bg-blue-100 rounded px-2 py-1">
            <span className="text-xs font-medium text-blue-800">⚡ 50% Faster Delivery</span>
          </div>
          <div>
            <span className="text-sm text-blue-700">Est. Hours:</span>
            <p className="font-bold text-blue-800">{analysisResults.estimated_hours}h</p>
          </div>
        </div>
      </div>

      {/* Team Composition */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h4 className="font-semibold text-purple-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Team Required
        </h4>
        <div className="space-y-3">
          {analysisResults.team_composition && (
            <>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Team Size:</span>
                <span className="font-bold text-purple-800">{analysisResults.team_composition.total_team_size} people</span>
              </div>
              <div className="space-y-1 text-sm">
                {analysisResults.team_composition.frontend_developers > 0 && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">Frontend:</span>
                    <span className="text-purple-800">{analysisResults.team_composition.frontend_developers}</span>
                  </div>
                )}
                {analysisResults.team_composition.backend_developers > 0 && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">Backend:</span>
                    <span className="text-purple-800">{analysisResults.team_composition.backend_developers}</span>
                  </div>
                )}
                {analysisResults.team_composition.devops_engineer > 0 && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">DevOps:</span>
                    <span className="text-purple-800">{analysisResults.team_composition.devops_engineer}</span>
                  </div>
                )}
                {analysisResults.team_composition.designer > 0 && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">Designer:</span>
                    <span className="text-purple-800">{analysisResults.team_composition.designer}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Code className="w-5 h-5 mr-2" />
        Recommended Tech Stack
      </h4>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Frontend Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {analysisResults.techStack?.frontend?.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Backend Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {analysisResults.techStack?.backend?.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Database:</p>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {analysisResults.techStack?.database}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Deployment:</p>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            {analysisResults.techStack?.deployment}
          </span>
        </div>
      </div>
      {analysisResults.techStack?.additional && analysisResults.techStack.additional.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Additional Tools:</p>
          <div className="flex flex-wrap gap-2">
            {analysisResults.techStack.additional.map((tool, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Development Phases */}
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Development Milestones
      </h4>
      <div className="space-y-4">
        {analysisResults.phases?.map((phase, i) => (
          <div key={i} className="border-l-4 border-emerald-500 pl-4 py-2">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-gray-900">{phase.name}</h5>
              <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                {phase.duration}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
            
            {/* Team Required for Phase */}
            {phase.developer_types && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Team Required:</p>
                <div className="flex flex-wrap gap-1">
                  {phase.developer_types.map((devType, j) => (
                    <span key={j} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {devType}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Deliverables */}
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">Deliverables:</p>
              <div className="flex flex-wrap gap-1">
                {phase.deliverables?.map((deliverable, j) => (
                  <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Key Features */}
    <div className="bg-emerald-50 rounded-lg p-6">
      <h4 className="font-semibold text-emerald-800 mb-4 flex items-center">
        <Star className="w-5 h-5 mr-2" />
        Key Features to Deliver
      </h4>
      <div className="grid md:grid-cols-2 gap-3">
        {analysisResults.keyFeatures?.map((feature, i) => (
          <div key={i} className="flex items-center">
            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
            <span className="text-emerald-800">{feature}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Risk Analysis */}
    <div className="bg-yellow-50 rounded-lg p-6">
      <h4 className="font-semibold text-yellow-800 mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2" />
        Risk Analysis & Mitigation
      </h4>
      <div className="space-y-4">
        {analysisResults.risks?.map((risk, i) => (
          <div key={i} className="border border-yellow-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-yellow-900">{risk.risk}</h5>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  risk.impact === 'High' ? 'bg-red-100 text-red-700' :
                  risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  Impact: {risk.impact}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  risk.probability === 'High' ? 'bg-red-100 text-red-700' :
                  risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  Probability: {risk.probability}
                </span>
              </div>
            </div>
            <p className="text-sm text-yellow-700">
              <strong>Mitigation:</strong> {risk.mitigation}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Resources Needed */}
    {analysisResults.resources && analysisResults.resources.length > 0 && (
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Required Resources & Tools
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {analysisResults.resources.map((resource, i) => (
            <div key={i} className="bg-white rounded border border-blue-200 p-3">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-blue-900">{resource.name}</h5>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  resource.cost === 'Free' ? 'bg-green-100 text-green-700' :
                  resource.cost === 'Paid' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {resource.cost}
                </span>
              </div>
              <p className="text-sm text-blue-700 mb-1">
                <strong>Type:</strong> {resource.type}
              </p>
              <p className="text-sm text-blue-600">{resource.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Why This Approach */}
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
      <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2" />
        Why This Approach Works
      </h4>
      <p className="text-emerald-700 leading-relaxed">{analysisResults.whyRecommended}</p>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        onClick={() => {
          setCurrentStep(2);
          setAnalysisResults(null);
        }}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Edit
      </button>
      
      <button
        onClick={handleSubmitProject}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        🚀 Start This Project - ${analysisResults.total_cost?.toLocaleString()}
      </button>
    </div>
  </div>
)}